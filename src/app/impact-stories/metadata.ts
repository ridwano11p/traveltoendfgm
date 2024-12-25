import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Impact Stories | Travel to End FGM",
  description: "Read inspiring stories and experiences from our community working to end FGM.",
  openGraph: {
    title: "Impact Stories | Travel to End FGM",
    description: "Read inspiring stories and experiences from our community working to end FGM.",
    type: "website",
    locale: "en_US",
    siteName: "Travel to End FGM"
  },
  twitter: {
    card: "summary_large_image",
    title: "Impact Stories | Travel to End FGM",
    description: "Read inspiring stories and experiences from our community working to end FGM."
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