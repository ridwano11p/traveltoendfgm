import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create Blog Post | Admin",
  description: "Create a new blog post",
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
