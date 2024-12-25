import { Metadata } from "next";
import { collection, query, getDocs, orderBy, limit, where } from "firebase/firestore";
import { db } from "@/lib/firebase/config";
import SearchResultsClient from "./SearchResultsClient";

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

async function getSearchResults(searchTerm: string, searchType: string) {
  try {
    let collections = ["blogs", "featureStories", "photos", "videos", "pdfs", "team_members"];
    if (searchType !== "all") {
      collections = [searchType];
    }

    const normalizedSearchTerm = searchTerm.toLowerCase().replace(/\s+/g, " ").trim();
    let allResults = [];

    for (const collectionName of collections) {
      let q = query(
        collection(db, collectionName),
        orderBy(collectionName === "team_members" ? "name" : "title"),
        limit(50)
      );

      const querySnapshot = await getDocs(q);
      const collectionResults = querySnapshot.docs.map(doc => ({
        id: doc.id,
        type: collectionName,
        ...doc.data()
      }));

      // Case-insensitive filtering with normalized spaces
      const filteredResults = collectionResults.filter(item => {
        const searchField = item.type === "team_members" ? item.name : item.title;
        const normalizedField = searchField.toLowerCase().replace(/\s+/g, " ").trim();
        return normalizedField.includes(normalizedSearchTerm);
      });

      allResults = [...allResults, ...filteredResults];
    }

    // Sort results by relevance (exact matches first, then partial matches)
    allResults.sort((a, b) => {
      const aField = a.type === "team_members" ? a.name : a.title;
      const bField = b.type === "team_members" ? b.name : b.title;
      const aFieldNormalized = aField.toLowerCase().replace(/\s+/g, " ").trim();
      const bFieldNormalized = bField.toLowerCase().replace(/\s+/g, " ").trim();
      
      const aStartsWith = aFieldNormalized.startsWith(normalizedSearchTerm);
      const bStartsWith = bFieldNormalized.startsWith(normalizedSearchTerm);
      
      if (aStartsWith && !bStartsWith) return -1;
      if (!aStartsWith && bStartsWith) return 1;
      
      // Secondary sort by date if available
      if (a.date && b.date) {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
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