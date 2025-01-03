import { Metadata } from "next";
import { collection, query, getDocs, orderBy, limit } from "firebase/firestore";
import { db } from "@/lib/firebase/config";
import SearchResultsClient from "./SearchResultsClient";
import { SearchResult, TeamMemberResult, ContentResult } from "@/types/search";

interface PageProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

export async function generateMetadata({ searchParams }: PageProps): Promise<Metadata> {
  const searchTerm = searchParams.q as string;
  const searchType = searchParams.type as string;

  const title = searchType && searchType !== "all"
    ? `Search ${searchType}: ${searchTerm} | Travel to End FGM`
    : `Search Results: ${searchTerm} | Travel to End FGM`;

  const description = searchType && searchType !== "all"
    ? `Search results for "${searchTerm}" in ${searchType}`
    : `Search results for "${searchTerm}" across all content`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
    },
    twitter: {
      card: "summary",
      title,
      description,
    },
    robots: {
      index: false,
      follow: true,
      nocache: true,
      googleBot: {
        index: false,
        follow: true,
        noimageindex: false,
      },
    },
  };
}

async function getSearchResults(searchTerm: string, searchType: string): Promise<SearchResult[]> {
  try {
    let collections = ["blogs", "featureStories", "photos", "videos", "pdfs", "team_members"];
    if (searchType !== "all") {
      collections = [searchType];
    }

    const normalizedSearchTerm = searchTerm.toLowerCase().replace(/\s+/g, " ").trim();
    let allResults: SearchResult[] = [];

    for (const collectionName of collections) {
      const q = query(
        collection(db, collectionName),
        orderBy(collectionName === "team_members" ? "name" : "title"),
        limit(50)
      );

      const querySnapshot = await getDocs(q);
      const collectionResults = querySnapshot.docs.map(doc => {
        const data = doc.data();
        const baseResult = {
          id: doc.id,
          type: collectionName,
          createdAt: data.createdAt?.toDate?.()?.toISOString() || undefined,
          updatedAt: data.updatedAt?.toDate?.()?.toISOString() || undefined,
        };

        if (collectionName === "team_members") {
          return {
            ...baseResult,
            name: data.name || "",
            role: data.role,
            bio: data.bio,
            imageUrl: data.imageUrl,
            linkedin: data.linkedin,
            facebook: data.facebook,
            youtube: data.youtube,
            twitter: data.twitter
          } as TeamMemberResult;
        }

        return {
          ...baseResult,
          title: data.title || "",
          description: data.description,
          content: data.content,
          author: data.author,
          date: data.date,
          imageUrl: data.imageUrl,
          videoUrl: data.videoUrl,
          isYouTube: data.isYouTube,
          pdfUrl: data.pdfUrl,
          photoUrl: data.photoUrl,
          tags: data.tags
        } as ContentResult;
      });

      const filteredResults = collectionResults.filter(item => {
        const searchField = item.type === "team_members"
          ? (item as TeamMemberResult).name
          : (item as ContentResult).title;
        const normalizedField = searchField.toLowerCase().replace(/\s+/g, " ").trim();
        return normalizedField.includes(normalizedSearchTerm);
      });

      allResults = [...allResults, ...filteredResults];
    }

    allResults.sort((a, b) => {
      const aField = a.type === "team_members"
        ? (a as TeamMemberResult).name
        : (a as ContentResult).title;
      const bField = b.type === "team_members"
        ? (b as TeamMemberResult).name
        : (b as ContentResult).title;
      const aFieldNormalized = aField.toLowerCase().replace(/\s+/g, " ").trim();
      const bFieldNormalized = bField.toLowerCase().replace(/\s+/g, " ").trim();

      const aStartsWith = aFieldNormalized.startsWith(normalizedSearchTerm);
      const bStartsWith = bFieldNormalized.startsWith(normalizedSearchTerm);

      if (aStartsWith && !bStartsWith) return -1;
      if (!aStartsWith && bStartsWith) return 1;

      if (a.createdAt && b.createdAt) {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      }

      return 0;
    });

    return allResults;
  } catch (error) {
    console.error("Error searching:", error);
    throw error;
  }
}

export default async function SearchResultsPage({ searchParams }: PageProps) {
  const searchTerm = searchParams.q as string;
  const searchType = (searchParams.type as string) || "all";

  if (!searchTerm) {
    return {
      redirect: {
        destination: "/search",
        permanent: false,
      },
    };
  }

  const results = await getSearchResults(searchTerm, searchType);
  return <SearchResultsClient results={results} />;
}
