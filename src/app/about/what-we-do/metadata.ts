import { Metadata } from "next";

export const metadata: Metadata = {
  title: "What We Do | Travel to End FGM",
  description: "Learn about our mission, approach, and impact in the fight against FGM. Discover how we work to create lasting change.",
  openGraph: {
    title: "What We Do | Travel to End FGM",
    description: "Learn about our mission, approach, and impact in the fight against FGM. Discover how we work to create lasting change.",
    type: "website",
    locale: "en_US",
    siteName: "Travel to End FGM"
  },
  twitter: {
    card: "summary_large_image",
    title: "What We Do | Travel to End FGM",
    description: "Learn about our mission, approach, and impact in the fight against FGM. Discover how we work to create lasting change."
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