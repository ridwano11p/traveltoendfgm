import { db } from "@/lib/firebase/config";
import { collection, getDocs } from "firebase/firestore";
import PhotoClient from "./PhotoClient";
import { Photo } from "./types";

async function getPhotos() {
  try {
    const querySnapshot = await getDocs(collection(db, 'photos'));
    const photos = querySnapshot.docs.map(doc => {
      const data = doc.data();

      if (!data.title || !data.photoUrl) {
        return null;
      }

      return {
        id: doc.id,
        title: data.title,
        description: data.description || '',
        photoUrl: data.photoUrl,
        createdAt: data.createdAt?.toDate?.()?.toISOString(),
        updatedAt: data.updatedAt?.toDate?.()?.toISOString()
      } as Photo;
    }).filter((photo): photo is Photo => photo !== null);

    return photos;
  } catch (error) {
    console.error("Error fetching photos:", error);
    throw new Error("Failed to fetch photos");
  }
}

export default async function PhotosPage() {
  const photos = await getPhotos();
  return <PhotoClient photos={photos} />;
}
