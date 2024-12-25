import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Search Results | Travel to End FGM",
  description: "Search results from our blogs, feature stories, images, videos, PDFs, and team members.",
  openGraph: {
    title: "Search Results | Travel to End FGM",
    description: "Search results from our blogs, feature stories, images, videos, PDFs, and team members.",
    type: "website",
    locale: "en_US",
    siteName: "Travel to End FGM"
  },
  twitter: {
    card: "summary_large_image",
    title: "Search Results | Travel to End FGM",
    description: "Search results from our blogs, feature stories, images, videos, PDFs, and team members."
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
  }
};