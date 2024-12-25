import { Suspense } from "react";
import { Metadata } from "next";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase/config";
import { notFound } from "next/navigation";
import ArticleClient from "./ArticleClient";

interface ArticleData {
  id: string;
  title: string;
  content: string;
  author?: string;
  date?: string;
  imageUrl?: string;
  videoUrl?: string;
  isYouTubeVideo?: boolean;
  tags?: string[];
  description?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

interface Props {
  params: {
    id: string;
  };
}

// Generate dynamic metadata for SEO
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const id = await Promise.resolve(params.id);
    // Try to fetch from 'blogs' collection
    let docRef = doc(db, "blogs", id);
    let docSnap = await getDoc(docRef);

    // If not found in 'blogs', try 'featureStories'
    if (!docSnap.exists()) {
      docRef = doc(db, "featureStories", id);
      docSnap = await getDoc(docRef);
    }

    if (!docSnap.exists()) {
      return {
        title: "Article Not Found | Travel to End FGM",
        description: "The requested article could not be found.",
      };
    }

    const data = docSnap.data() as ArticleData;

    return {
      title: `${data.title} | Travel to End FGM`,
      description: data.description || data.content.substring(0, 155) + "...",
      openGraph: {
        title: data.title,
        description: data.description || data.content.substring(0, 155) + "...",
        type: "article",
        ...(data.imageUrl && { images: [data.imageUrl] }),
        publishedTime: data.date,
        authors: data.author ? [data.author] : undefined,
      },
      twitter: {
        card: "summary_large_image",
        title: data.title,
        description: data.description || data.content.substring(0, 155) + "...",
        ...(data.imageUrl && { images: [data.imageUrl] }),
      },
    };
  } catch (error) {
    console.error("Error generating metadata:", error);
    return {
      title: "Article | Travel to End FGM",
      description: "Read our latest articles and stories about ending FGM.",
    };
  }
}

async function getArticle(id: string): Promise<ArticleData | null> {
  try {
    // Try to fetch from 'blogs' collection
    let docRef = doc(db, "blogs", id);
    let docSnap = await getDoc(docRef);

    // If not found in 'blogs', try 'featureStories'
    if (!docSnap.exists()) {
      docRef = doc(db, "featureStories", id);
      docSnap = await getDoc(docRef);
    }

    if (!docSnap.exists()) {
      return null;
    }

    const data = docSnap.data();
    
    // Convert Firestore Timestamps to regular dates
    const createdAt = data.createdAt?.toDate?.() || null;
    const updatedAt = data.updatedAt?.toDate?.() || null;

    return {
      id: docSnap.id,
      ...data,
      createdAt: createdAt ? new Date(createdAt).toISOString() : undefined,
      updatedAt: updatedAt ? new Date(updatedAt).toISOString() : undefined,
    } as ArticleData;
  } catch (error) {
    console.error("Error fetching article:", error);
    throw new Error("Failed to fetch article");
  }
}

export default async function ArticlePage({ params }: Props) {
  const id = await Promise.resolve(params.id);
  const article = await getArticle(id);

  if (!article) {
    notFound();
  }

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ArticleClient article={article} />
    </Suspense>
  );
}