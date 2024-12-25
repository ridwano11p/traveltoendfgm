import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Article | Travel to End FGM",
  description: "Read our latest articles and stories about ending FGM.",
  openGraph: {
    title: "Article | Travel to End FGM",
    description: "Read our latest articles and stories about ending FGM.",
    type: "article",
    locale: "en_US",
    siteName: "Travel to End FGM"
  },
  twitter: {
    card: "summary_large_image",
    title: "Article | Travel to End FGM",
    description: "Read our latest articles and stories about ending FGM."
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