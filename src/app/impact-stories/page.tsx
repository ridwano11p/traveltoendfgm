import { Metadata } from "next";
import { collection, query, orderBy, limit, getDocs, startAfter, Timestamp, getCountFromServer } from "firebase/firestore";
import { db } from "@/lib/firebase/config";
import ImpactStoriesClient from "./ImpactStoriesClient";
import { redirect } from "next/navigation";

type Props = {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

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
    const blogsCollection = collection(db, "blogs");
    const snapshot = await getCountFromServer(blogsCollection);
    const totalBlogs = snapshot.data().count;
    const totalPages = Math.ceil(totalBlogs / BLOGS_PER_PAGE);

    // Ensure page is within valid range
    const validPage = Math.max(1, Math.min(page, totalPages));

    let q = query(
      blogsCollection,
      orderBy("createdAt", "desc"),
      limit(BLOGS_PER_PAGE)
    );

    if (validPage > 1) {
      const previousPageQuery = query(
        blogsCollection,
        orderBy("createdAt", "desc"),
        limit((validPage - 1) * BLOGS_PER_PAGE)
      );
      const previousPageDocs = await getDocs(previousPageQuery);
      const lastVisibleDoc = previousPageDocs.docs[previousPageDocs.docs.length - 1];

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
      currentPage: validPage,
    };
  } catch (error) {
    console.error("Error fetching blogs:", error);
    throw new Error("Failed to fetch blogs");
  }
}

export default async function ImpactStoriesPage(props: Props) {
  const page = props.searchParams?.page;
  const requestedPage = Math.max(1, Number(Array.isArray(page) ? page[0] : page) || 1);

  try {
    const { blogs, totalPages, currentPage } = await getBlogs(requestedPage);

    // Redirect if requested page is invalid
    if (requestedPage > totalPages) {
      redirect(`/impact-stories?page=${totalPages}`);
    }

    return (
      <ImpactStoriesClient
        blogs={blogs}
        totalPages={totalPages}
        currentPage={currentPage}
      />
    );
  } catch (error) {
    console.error("Error in ImpactStoriesPage:", error);
    throw new Error("Failed to load impact stories");
  }
}
