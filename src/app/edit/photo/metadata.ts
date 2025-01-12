import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Edit Photos | Admin",
  description: "Edit or delete photos in the gallery",
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
