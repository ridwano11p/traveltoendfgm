import { collection, query, orderBy, limit, getDocs, Timestamp } from "firebase/firestore";
import { db } from "@/lib/firebase/config";
import HomeClient from "./components/HomeClient";
import { BlogPost, FeatureStory, FirestoreData } from "./types";

const convertTimestampToString = (timestamp: Timestamp | undefined): string => {
  if (!timestamp) return '';
  return timestamp.toDate().toISOString();
};

async function getData() {
  try {
    // Fetch latest blogs
    const blogsQuery = query(
      collection(db, "blogs"),
      orderBy("createdAt", "desc"),
      limit(5)
    );
    const blogsSnapshot = await getDocs(blogsQuery);
    const blogs = blogsSnapshot.docs.map((doc) => {
      const data = doc.data() as FirestoreData;
      return {
        id: doc.id,
        title: data.title,
        content: data.content,
        imageUrl: data.imageUrl,
        videoUrl: data.videoUrl,
        isYouTubeVideo: data.isYouTubeVideo,
        tags: data.tags || [],
        createdAt: convertTimestampToString(data.createdAt),
        updatedAt: convertTimestampToString(data.updatedAt),
      };
    }) as BlogPost[];

    // Fetch feature story
    const featureQuery = query(
      collection(db, "featureStories"),
      orderBy("createdAt", "desc"),
      limit(1)
    );
    const featureSnapshot = await getDocs(featureQuery);
    let featureStory: FeatureStory | null = null;

    if (!featureSnapshot.empty) {
      const featureData = featureSnapshot.docs[0].data() as FirestoreData;
      featureStory = {
        id: featureSnapshot.docs[0].id,
        title: featureData.title,
        content: featureData.content,
        imageUrl: featureData.imageUrl,
        videoUrl: featureData.videoUrl,
        isYouTubeVideo: featureData.isYouTubeVideo,
        tags: featureData.tags || [],
        createdAt: convertTimestampToString(featureData.createdAt),
        updatedAt: convertTimestampToString(featureData.updatedAt),
      } as FeatureStory;
    }

    return {
      blogs,
      featureStory,
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    throw new Error("Failed to fetch data");
  }
}

export default async function HomePage() {
  const data = await getData();
  return <HomeClient initialData={data} />;
}
