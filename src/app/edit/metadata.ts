import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Edit Content | Admin",
  description: "Edit existing content across the website",
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
      noimageindex: true,
    },
  },
};