import { db } from "@/lib/firebase/config";
import { collection, query, where, getDocs } from "firebase/firestore";
import TagClient from "./TagClient";
import { Post } from "./types";

interface Props {
  params: { tag: string };
}

async function getPostsByTag(tag: string) {
  try {
    const blogQuery = query(
      collection(db, 'blogs'),
      where('tags', 'array-contains', tag)
    );
    const featureStoryQuery = query(
      collection(db, 'featureStories'),
      where('tags', 'array-contains', tag)
    );

    const [blogSnapshot, featureStorySnapshot] = await Promise.all([
      getDocs(blogQuery),
      getDocs(featureStoryQuery)
    ]);

    const blogData = blogSnapshot.docs.map(doc => ({
      id: doc.id,
      type: 'blog' as const,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toDate?.()?.toISOString(),
      updatedAt: doc.data().updatedAt?.toDate?.()?.toISOString()
    }));

    const featureStoryData = featureStorySnapshot.docs.map(doc => ({
      id: doc.id,
      type: 'featureStory' as const,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toDate?.()?.toISOString(),
      updatedAt: doc.data().updatedAt?.toDate?.()?.toISOString()
    }));

    const allPosts = [...blogData, ...featureStoryData];
    allPosts.sort((a, b) =>
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

    return allPosts as Post[];
  } catch (error) {
    console.error("Error fetching posts by tag:", error);
    throw new Error("Failed to fetch posts");
  }
}

export default async function TagPage({ params }: Props) {
  const decodedTag = decodeURIComponent(params.tag);
  const posts = await getPostsByTag(decodedTag);
  return <TagClient posts={posts} tag={decodedTag} />;
}
