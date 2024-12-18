"use client";

import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "@/context/ThemeContext";
import { AuthProvider } from "@/context/AuthContext";
import Navigation from "@/components/shared/Navigation";
import ServerLayout from "./layout-server";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-white dark:bg-slate-900`}>
        <ThemeProvider>
          <AuthProvider>
            <Navigation />
            <ServerLayout>
              <main className="flex-grow">
                {children}
              </main>
            </ServerLayout>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}