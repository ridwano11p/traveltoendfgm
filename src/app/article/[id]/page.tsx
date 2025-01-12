import { db } from "@/lib/firebase/config";
import { doc, getDoc } from "firebase/firestore";
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { Article } from './types';
import ArticleClient from './ArticleClient';

interface Props {
  params: { id: string };
}

// Generate metadata for the article
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const article = await getArticle(params.id);
    if (!article) {
      return {
        title: 'Article Not Found',
        description: 'The requested article could not be found.'
      };
    }

    return {
      title: article.title,
      description: article.content.substring(0, 155) + '...',
      authors: article.author ? [{ name: article.author }] : undefined,
      openGraph: {
        title: article.title,
        description: article.content.substring(0, 155) + '...',
        type: 'article',
        ...(article.imageUrl && { images: [article.imageUrl] }),
        publishedTime: article.createdAt.toISOString(),
        modifiedTime: article.updatedAt.toISOString(),
        authors: article.author ? [article.author] : undefined,
      },
      twitter: {
        card: 'summary_large_image',
        title: article.title,
        description: article.content.substring(0, 155) + '...',
        ...(article.imageUrl && { images: [article.imageUrl] }),
      }
    };
  } catch (_error) {
    return {
      title: 'Article',
      description: 'Read our latest articles and stories.'
    };
  }
}

async function getArticle(id: string): Promise<Article | null> {
  try {
    // Try to fetch from 'blogs' collection
    let docRef = doc(db, 'blogs', id);
    let docSnap = await getDoc(docRef);

    // If not found in 'blogs', try 'featureStories'
    if (!docSnap.exists()) {
      docRef = doc(db, 'featureStories', id);
      docSnap = await getDoc(docRef);
    }

    if (!docSnap.exists()) {
      return null;
    }

    const data = docSnap.data();

    // Convert Firestore Timestamps to Dates
    const createdAt = data.createdAt?.toDate?.() || null;
    const updatedAt = data.updatedAt?.toDate?.() || null;

    return {
      id: docSnap.id,
      ...data,
      createdAt: createdAt || new Date(),
      updatedAt: updatedAt || new Date(),
    } as Article;
  } catch (error) {
    console.error("Error fetching article:", error);
    throw new Error("Failed to fetch article");
  }
}

export default async function ArticlePage({ params }: Props) {
  const article = await getArticle(params.id);

  if (!article) {
    notFound();
  }

  return <ArticleClient article={article} />;
}
