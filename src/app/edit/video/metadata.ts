import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Edit Videos | Admin",
  description: "Edit or delete videos",
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
