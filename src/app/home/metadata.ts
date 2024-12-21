import { Metadata } from "next";
import sitelogo from "@/assets/images/sitelogo.png";

export const metadata: Metadata = {
  title: "Travel to End FGM",
  description: "Travel to End FGM is a platform dedicated to raising awareness and sharing stories to help end Female Genital Mutilation worldwide.",
  applicationName: "Travel to End FGM",
  authors: [{ name: "Travel to End FGM Team" }],
  keywords: ["FGM", "Female Genital Mutilation", "Awareness", "Stories", "Impact", "Travel", "Education"],
  creator: "Travel to End FGM Team",
  publisher: "Travel to End FGM",
  formatDetection: {
    telephone: true,
    date: true,
    address: true,
    email: true,
  },
  metadataBase: new URL("https://traveltoendfgm.vercel.app"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Travel to End FGM",
    description: "Join the movement to end Female Genital Mutilation. Learn, share, and take action with Travel to End FGM.",
    url: "https://traveltoendfgm.vercel.app",
    siteName: "Travel to End FGM",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: sitelogo.src,
        width: sitelogo.width,
        height: sitelogo.height,
        alt: "Travel to End FGM Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Travel to End FGM",
    description: "Join the movement to end Female Genital Mutilation. Learn, share, and take action with Travel to End FGM.",
    creator: "@traveltoendfgm",
    images: [sitelogo.src],
  },
  verification: {
    google: "PYw-8cZRCmTG8kQsJRVAgNbrEyz0hOrR3TVVhAzi7A0",
  },
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
  category: "Activism",
};