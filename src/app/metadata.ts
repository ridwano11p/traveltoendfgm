import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Travel To End FGM",
  description: "Join us in our mission to end FGM through education, awareness, and community engagement.",
  keywords: ["FGM", "women's rights", "education", "awareness", "community", "social impact"],
  authors: [{ name: "Travel To End FGM Team" }],
  openGraph: {
    title: "Travel To End FGM",
    description: "Join us in our mission to end FGM through education, awareness, and community engagement.",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Travel To End FGM"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Travel To End FGM",
    description: "Join us in our mission to end FGM through education, awareness, and community engagement.",
    images: ["/twitter-image.jpg"]
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
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
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "#0f172a" }
  ]
};