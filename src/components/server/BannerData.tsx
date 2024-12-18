import { collection, query, orderBy, limit, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase/config';
import { cache } from 'react';

export interface BannerData {
  title: string;
  description: string;
  mediaUrl: string;
  mediaType: 'image' | 'video';
  isYouTubeVideo: boolean;
  createdAt?: string;
  updatedAt?: string;
}

// Helper function to serialize Firestore data
function serializeData(doc: any) {
  const data = doc.data();
  return Object.entries(data).reduce((acc: any, [key, value]) => {
    // Convert Timestamp to ISO string
    if (value && typeof value === 'object' && 'toDate' in value) {
      acc[key] = value.toDate().toISOString();
    } 
    // Handle arrays
    else if (Array.isArray(value)) {
      acc[key] = [...value];
    }
    // Handle regular objects
    else if (value && typeof value === 'object') {
      acc[key] = { ...value };
    }
    // Handle primitive values
    else {
      acc[key] = value;
    }
    return acc;
  }, {} as BannerData);
}

export const getBannerContent = cache(async () => {
  try {
    const q = query(collection(db, 'banners'), orderBy('createdAt', 'desc'), limit(1));
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      const serializedData = serializeData(querySnapshot.docs[0]);
      return {
        success: true,
        data: serializedData
      };
    }
    return { success: true, data: null };
  } catch (err) {
    console.error("Error fetching banner content: ", err);
    return { success: false, error: "Failed to fetch banner content" };
  }
});

export default async function BannerData() {
  const result = await getBannerContent();
  return result;
}