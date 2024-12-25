"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useTheme } from "@/context/ThemeContext";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ArticleError({ error, reset }: ErrorProps) {
  const router = useRouter();
  const { theme } = useTheme();
  const isDark = theme === "dark";

  useEffect(() => {
    console.error("Article page error:", error);
  }, [error]);

  return (
    <div className={`min-h-screen py-12 ${isDark ? "bg-gray-900" : "bg-[#90d2dc]"}`}>
      <div className="max-w-xl mx-auto px-4">
        <div className="text-center">
          <h2 className={`text-2xl font-bold mb-4 ${isDark ? "text-white" : "text-gray-900"}`}>
            Error Loading Article
          </h2>
          <p className={`mb-8 ${isDark ? "text-gray-300" : "text-gray-600"}`}>
            We encountered an error while trying to load this article. Please try again or return to the homepage.
          </p>
          <div className="space-x-4">
            <button
              onClick={reset}
              className={`inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white ${
                isDark ? "bg-blue-600 hover:bg-blue-700" : "bg-blue-500 hover:bg-blue-600"
              } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
            >
              Try again
            </button>
            <button
              onClick={() => router.push("/")}
              className={`inline-flex items-center px-4 py-2 border text-base font-medium rounded-md ${
                isDark
                  ? "border-gray-600 text-gray-300 hover:bg-gray-800"
                  : "border-gray-300 text-gray-700 bg-white hover:bg-gray-50"
              } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
            >
              Return to Homepage
            </button>
          </div>
          {error.message && (
            <div className={`mt-6 p-4 rounded-md ${
              isDark ? "bg-red-900/50 text-red-200" : "bg-red-50 text-red-700"
            }`}>
              <p className="text-sm">
                Error details: {error.message}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}