import { Metadata } from "next";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase/config";
import { notFound } from "next/navigation";
import WhatWeDoClient from "./WhatWeDoClient";

interface WhatWeDoContent {
  mission: string;
  approach: string;
  impact: string;
  imageUrl?: string;
}

interface FirestoreWhatWeDoContent extends WhatWeDoContent {
  updatedAt?: any; // We'll exclude this when passing to client
}

export async function generateMetadata(): Promise<Metadata> {
  try {
    const docRef = doc(db, "about", "what_we_do");
    const docSnap = await getDoc(docRef);
    
    if (!docSnap.exists()) {
      return {
        title: "What We Do | Travel to End FGM",
        description: "Learn about our mission and approach in the fight against FGM.",
      };
    }

    const data = docSnap.data() as WhatWeDoContent;
    const description = data.mission.substring(0, 155) + "...";

    return {
      title: "What We Do | Travel to End FGM",
      description,
      openGraph: {
        title: "What We Do | Travel to End FGM",
        description,
        images: data.imageUrl ? [data.imageUrl] : undefined,
      },
      twitter: {
        card: "summary_large_image",
        title: "What We Do | Travel to End FGM",
        description,
        images: data.imageUrl ? [data.imageUrl] : undefined,
      },
    };
  } catch (error) {
    console.error("Error generating metadata:", error);
    return {
      title: "What We Do | Travel to End FGM",
      description: "Learn about our mission and approach in the fight against FGM.",
    };
  }
}

async function getWhatWeDoContent(): Promise<WhatWeDoContent> {
  try {
    const docRef = doc(db, "about", "what_we_do");
    const docSnap = await getDoc(docRef);
    
    if (!docSnap.exists()) {
      throw new Error("No content found. Please add content for 'What We Do'.");
    }

    const data = docSnap.data() as FirestoreWhatWeDoContent;
    
    // Extract only the fields we need, excluding the timestamp
    const clientContent: WhatWeDoContent = {
      mission: data.mission,
      approach: data.approach,
      impact: data.impact,
      imageUrl: data.imageUrl
    };

    return clientContent;
  } catch (error) {
    console.error("Error fetching 'What We Do' content: ", error);
    throw error;
  }
}

export default async function WhatWeDoPage() {
  const content = await getWhatWeDoContent();

  if (!content) {
    notFound();
  }

  return <WhatWeDoClient content={content} />;
}