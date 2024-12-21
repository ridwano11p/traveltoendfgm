import { Metadata } from "next";
import sitelogo from "@/assets/images/sitelogo.png";

export const metadata: Metadata = {
  // Override title for home page (no template)
  title: "Travel to End FGM - Join the Movement to End Female Genital Mutilation",
  
  // Specific description for home page
  description: "Join the movement to end Female Genital Mutilation. Learn about our mission, read impact stories, and take action with Travel to End FGM.",
  
  // Specific OpenGraph for home page sharing
  openGraph: {
    title: "Travel to End FGM - Make an Impact",
    description: "Join our mission to end Female Genital Mutilation through education, awareness, and action.",
    images: [
      {
        url: sitelogo.src,
        width: sitelogo.width,
        height: sitelogo.height,
        alt: "Travel to End FGM Homepage",
      },
    ],
  },
  
  // Specific Twitter card for home page
  twitter: {
    card: "summary_large_image",
    title: "Travel to End FGM - Make an Impact",
    description: "Join our mission to end Female Genital Mutilation through education, awareness, and action.",
    images: [sitelogo.src],
  },
  
  // Override robots for home page to ensure indexing
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};