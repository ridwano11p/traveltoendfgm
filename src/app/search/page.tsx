import { Metadata } from "next";
import SearchClient from "./SearchClient";

interface PageProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

export const metadata: Metadata = {
  title: "Search | Travel to End FGM",
  description: "Search through our blogs, feature stories, images, videos, PDFs, and team members to find the content you're looking for.",
  openGraph: {
    title: "Search | Travel to End FGM",
    description: "Search through our blogs, feature stories, images, videos, PDFs, and team members to find the content you're looking for.",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Search | Travel to End FGM",
    description: "Search through our blogs, feature stories, images, videos, PDFs, and team members to find the content you're looking for.",
  },
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
    },
  },
};

export default function SearchPage({ searchParams }: PageProps) {
  // If there's a search query, redirect to the results page
  if (searchParams.q) {
    return {
      redirect: {
        destination: `/search/results?${new URLSearchParams(searchParams as Record<string, string>).toString()}`,
        permanent: false,
      },
    };
  }

  return (
    <SearchClient 
      initialSearchTerm={searchParams.q as string} 
      initialSearchType={searchParams.type as string} 
    />
  );
}