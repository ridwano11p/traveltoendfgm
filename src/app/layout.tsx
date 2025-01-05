import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "./providers/Providers";
import NavBar from "@/components/shared/NavBar";
import Footer from "@/components/shared/footer/Footer";
import sitelogo from "@/assets/images/sitelogo.png";

const inter = Inter({ subsets: ["latin"] });

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#90d2dc" },
    { media: "(prefers-color-scheme: dark)", color: "#111827" },
  ],
  minimumScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://traveltoendfgm.vercel.app"),
  title: {
    template: "%s | Travel to End FGM",
    default: "Travel to End FGM",
  },
  description:
    "Travel to End FGM is a platform dedicated to raising awareness and sharing stories to help end Female Genital Mutilation worldwide.",
  applicationName: "Travel to End FGM",
  authors: [{ name: "Travel to End FGM Team" }],
  keywords: [
    "FGM",
    "Female Genital Mutilation",
    "Awareness",
    "Stories",
    "Impact",
    "Travel",
    "Education",
  ],
  formatDetection: {
    telephone: true,
    date: true,
    address: true,
    email: true,
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/icon.png", type: "image/png" },
    ],
    apple: [{ url: "/apple-icon.png", type: "image/png" }],
  },
  manifest: "/manifest.json",
  verification: {
    google: "PYw-8cZRCmTG8kQsJRVAgNbrEyz0hOrR3TVVhAzi7A0",
  },
  category: "Activism",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>
          <div className="min-h-screen flex flex-col">
            <NavBar />
            <main className="flex-grow">{children}</main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
