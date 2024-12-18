import { collection, query, orderBy, limit, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase/config";
import HomeClient from "@/components/shared/HomeClient";

export interface BlogPost {
  id: string;
  title: string;
  content: string;
  imageUrl?: string;
  videoUrl?: string;
  isYouTubeVideo?: boolean;
  tags: string[];
  createdAt: string;
}

export interface FeatureStory {
  id: string;
  title: string;
  content: string;
  imageUrl?: string;
  videoUrl?: string;
  isYouTubeVideo?: boolean;
  tags: string[];
  createdAt: string;
}

async function getData() {
  try {
    // Fetch latest blogs
    const blogsQuery = query(
      collection(db, "blogs"),
      orderBy("createdAt", "desc"),
      limit(5)
    );
    const blogsSnapshot = await getDocs(blogsQuery);
    const blogs = blogsSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as BlogPost[];

    // Fetch feature story
    const featureQuery = query(
      collection(db, "featureStories"),
      orderBy("createdAt", "desc"),
      limit(1)
    );
    const featureSnapshot = await getDocs(featureQuery);
    let featureStory: FeatureStory | null = null;

    if (!featureSnapshot.empty) {
      const featureData = featureSnapshot.docs[0].data();
      featureStory = {
        id: featureSnapshot.docs[0].id,
        ...featureData,
        tags: featureData.tags || [],
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

export default async function Home() {
  const data = await getData();

  return <HomeClient initialData={data} />;
}