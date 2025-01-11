import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Edit Blogs | Admin",
  description: "Edit and manage blog posts",
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