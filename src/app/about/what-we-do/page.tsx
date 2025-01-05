import { db } from "@/lib/firebase/config";
import { doc, getDoc } from "firebase/firestore";
import WhatWeDoClient from "./WhatWeDoClient";
import { DocumentData } from "firebase/firestore";

interface FirestoreWhatWeDo extends DocumentData {
  mission: string;
  approach: string;
  impact: string;
  imageUrl?: string;
  updatedAt?: {
    seconds: number;
    nanoseconds: number;
  };
}

async function getWhatWeDoContent() {
  try {
    const docRef = doc(db, 'about', 'what_we_do');
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const data = docSnap.data() as FirestoreWhatWeDo;

      // Convert Firestore Timestamp to ISO string
      const content = {
        mission: data.mission,
        approach: data.approach,
        impact: data.impact,
        imageUrl: data.imageUrl,
        updatedAt: data.updatedAt
          ? new Date(data.updatedAt.seconds * 1000).toISOString()
          : undefined
      };

      return { content, error: null };
    }

    return {
      content: null,
      error: "No content found. Please add content for 'What We Do'."
    };
  } catch (err) {
    console.error("Error fetching 'What We Do' content: ", err);
    return {
      content: null,
      error: "Failed to fetch content. Please try again later."
    };
  }
}

export default async function WhatWeDo() {
  const { content, error } = await getWhatWeDoContent();
  return <WhatWeDoClient content={content} error={error} />;
}
