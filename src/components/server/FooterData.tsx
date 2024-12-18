import { collection, query, orderBy, limit, getDocs, Timestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase/config';
import { cache } from 'react';

export interface ContactInfo {
  email: string;
  phone: string;
  location: string;
  createdAt: string;
}

type ContactInfoResult = {
  success: true;
  data: ContactInfo | null;
} | {
  success: false;
  error: string;
};

type FirestoreContactInfo = {
  email: string;
  phone: string;
  location: string;
  createdAt: Timestamp;
};

function isValidContactInfo(data: unknown): data is FirestoreContactInfo {
  if (!data || typeof data !== 'object') return false;
  
  const d = data as Record<string, unknown>;
  return (
    typeof d.email === 'string' &&
    typeof d.phone === 'string' &&
    typeof d.location === 'string' &&
    d.createdAt instanceof Timestamp
  );
}

export const getContactInfo = cache(async (): Promise<ContactInfoResult> => {
  try {
    const q = query(
      collection(db, 'siteContactInfo'),
      orderBy('createdAt', 'desc'),
      limit(1)
    );
    
    const querySnapshot = await getDocs(q);
    
    if (!querySnapshot.empty) {
      const rawData = querySnapshot.docs[0].data();
      
      if (!isValidContactInfo(rawData)) {
        return {
          success: false,
          error: 'Invalid contact info data structure'
        };
      }

      return {
        success: true,
        data: {
          email: rawData.email,
          phone: rawData.phone,
          location: rawData.location,
          createdAt: rawData.createdAt.toDate().toISOString(),
        }
      };
    }
    
    return { success: true, data: null };
  } catch (error) {
    console.error('Error fetching contact info:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Failed to fetch contact information'
    };
  }
});

export default async function FooterData() {
  const result = await getContactInfo();
  return result;
}