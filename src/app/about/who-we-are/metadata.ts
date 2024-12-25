import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Who We Are | Travel to End FGM",
  description: "Meet our dedicated team working to end FGM. Learn about our team members and their roles in creating lasting change.",
  openGraph: {
    title: "Who We Are | Travel to End FGM",
    description: "Meet our dedicated team working to end FGM. Learn about our team members and their roles in creating lasting change.",
    type: "website",
    locale: "en_US",
    siteName: "Travel to End FGM"
  },
  twitter: {
    card: "summary_large_image",
    title: "Who We Are | Travel to End FGM",
    description: "Meet our dedicated team working to end FGM. Learn about our team members and their roles in creating lasting change."
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