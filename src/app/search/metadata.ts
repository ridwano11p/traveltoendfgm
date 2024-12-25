import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Search | Travel to End FGM",
  description: "Search through our blogs, feature stories, images, videos, PDFs, and team members to find the content you're looking for.",
  openGraph: {
    title: "Search | Travel to End FGM",
    description: "Search through our blogs, feature stories, images, videos, PDFs, and team members to find the content you're looking for.",
    type: "website",
    locale: "en_US",
    siteName: "Travel to End FGM"
  },
  twitter: {
    card: "summary_large_image",
    title: "Search | Travel to End FGM",
    description: "Search through our blogs, feature stories, images, videos, PDFs, and team members to find the content you're looking for."
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  }
};