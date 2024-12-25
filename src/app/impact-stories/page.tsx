import { Metadata } from "next";
import { collection, query, orderBy, limit, getDocs, startAfter, Timestamp, getCountFromServer, QueryDocumentSnapshot, DocumentData } from "firebase/firestore";
import { db } from "@/lib/firebase/config";
import ImpactStoriesClient from "./ImpactStoriesClient";

interface BlogPost {
  id: string;
  title: string;
  content: string;
  author?: string;
  date?: string;
  imageUrl?: string;
  videoUrl?: string;
  isYouTubeVideo?: boolean;
  tags?: string[];
}

interface PageProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

const BLOGS_PER_PAGE = 4;

export async function generateMetadata(): Promise<Metadata> {
  try {
    const blogsCollection = collection(db, "blogs");
    const snapshot = await getCountFromServer(blogsCollection);
    const totalBlogs = snapshot.data().count;

    return {
      title: "Impact Stories | Travel to End FGM",
      description: `Read ${totalBlogs} inspiring stories and experiences from our community working to end FGM.`,
      openGraph: {
        title: "Impact Stories | Travel to End FGM",
        description: `Read ${totalBlogs} inspiring stories and experiences from our community working to end FGM.`,
        type: "website",
      },
    };
  } catch (error) {
    console.error("Error generating metadata:", error);
    return {
      title: "Impact Stories | Travel to End FGM",
      description: "Read inspiring stories and experiences from our community working to end FGM.",
    };
  }
}

const convertTimestampToString = (timestamp: Timestamp | undefined): string => {
  if (!timestamp) return "";
  return timestamp.toDate().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

async function getBlogs(page: number) {
  try {
    // Get total count for pagination
    const blogsCollection = collection(db, "blogs");
    const snapshot = await getCountFromServer(blogsCollection);
    const totalBlogs = snapshot.data().count;
    const totalPages = Math.ceil(totalBlogs / BLOGS_PER_PAGE);

    // Base query
    let q = query(
      blogsCollection,
      orderBy("createdAt", "desc"),
      limit(BLOGS_PER_PAGE)
    );

    // If not the first page, get the document to start after
    if (page > 1) {
      // Get the last document of the previous page
      const previousPageQuery = query(
        blogsCollection,
        orderBy("createdAt", "desc"),
        limit((page - 1) * BLOGS_PER_PAGE)
      );
      const previousPageDocs = await getDocs(previousPageQuery);
      const lastVisibleDoc = previousPageDocs.docs[previousPageDocs.docs.length - 1];
      
      // Update query with startAfter
      q = query(
        blogsCollection,
        orderBy("createdAt", "desc"),
        startAfter(lastVisibleDoc),
        limit(BLOGS_PER_PAGE)
      );
    }

    const querySnapshot = await getDocs(q);
    const blogs = querySnapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        title: data.title,
        content: data.content,
        author: data.author,
        date: convertTimestampToString(data.createdAt),
        imageUrl: data.imageUrl,
        videoUrl: data.videoUrl,
        isYouTubeVideo: data.isYouTubeVideo,
        tags: data.tags || [],
      };
    });

    return {
      blogs,
      totalPages,
    };
  } catch (error) {
    console.error("Error fetching blogs:", error);
    throw new Error("Failed to fetch blogs");
  }
}

export default async function ImpactStoriesPage({ searchParams }: PageProps) {
  const currentPage = Number(searchParams.page) || 1;
  const { blogs, totalPages } = await getBlogs(currentPage);

  return <ImpactStoriesClient blogs={blogs} totalPages={totalPages} />;
}