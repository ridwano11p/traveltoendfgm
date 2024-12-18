import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Navigation from "@/components/shared/Navigation";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

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
  },
  twitter: {
    card: "summary_large_image",
    title: "Travel To End FGM",
    description: "Join us in our mission to end FGM through education, awareness, and community engagement.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-white dark:bg-slate-900`}>
        <div className="flex flex-col min-h-screen">
          <Navigation />
          <main className="flex-grow">
            {children}
          </main>
          <footer className="bg-white dark:bg-slate-900 border-t dark:border-slate-800">
            <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
              <p className="text-center text-sm text-slate-600 dark:text-slate-400">
                © {new Date().getFullYear()} Travel To End FGM. All rights reserved.
              </p>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
