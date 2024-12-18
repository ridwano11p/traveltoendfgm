import { collection, getDocs, query, limit } from "firebase/firestore";
import { db } from "@/lib/firebase/config";

interface ContentExistence {
  [key: string]: boolean;
}

export async function getContentExistence(): Promise<ContentExistence> {
  try {
    const existence: ContentExistence = {};

    // Check Feature Story
    const featureQuery = query(collection(db, "featureStories"), limit(1));
    const featureSnapshot = await getDocs(featureQuery);
    existence["Feature Story"] = !featureSnapshot.empty;

    // Check What We Do
    const whatWeDoQuery = query(collection(db, "whatWeDo"), limit(1));
    const whatWeDoSnapshot = await getDocs(whatWeDoQuery);
    existence["What We Do"] = !whatWeDoSnapshot.empty;

    // Check Banner
    const bannerQuery = query(collection(db, "banners"), limit(1));
    const bannerSnapshot = await getDocs(bannerQuery);
    existence["Banner"] = !bannerSnapshot.empty;

    return existence;
  } catch (error) {
    console.error("Error checking content existence:", error);
    return {};
  }
}