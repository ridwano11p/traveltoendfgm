import { db } from "@/lib/firebase/config";
import { collection, getDocs, DocumentData } from "firebase/firestore";
import VideoClient from "./VideoClient";
import { Video } from "./types";

async function getVideos() {
  try {
    const querySnapshot = await getDocs(collection(db, 'videos'));
    const videos = querySnapshot.docs.map(doc => {
      const data = doc.data();

      // Ensure required fields exist
      if (!data.title || (!data.videoUrl && !data.youtubeId)) {
        return null;
      }

      return {
        id: doc.id,
        title: data.title,
        description: data.description || '',
        isYouTube: Boolean(data.isYouTube),
        youtubeId: data.youtubeId || '',
        videoUrl: data.videoUrl || '',
        thumbnailUrl: data.thumbnailUrl,
        createdAt: data.createdAt?.toDate?.()?.toISOString(),
        updatedAt: data.updatedAt?.toDate?.()?.toISOString()
      } as Video;
    }).filter((video): video is Video => video !== null); // Type guard to remove null values

    return videos;
  } catch (error) {
    console.error("Error fetching videos:", error);
    throw new Error("Failed to fetch videos");
  }
}

export default async function VideosPage() {
  const videos = await getVideos();
  return <VideoClient videos={videos} />;
}
