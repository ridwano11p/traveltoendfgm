"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useTheme } from "@/context/ThemeContext";
import { FaExclamationTriangle } from "react-icons/fa";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ImpactStoriesError({ error, reset }: ErrorProps) {
  const router = useRouter();
  const { theme } = useTheme();
  const isDark = theme === "dark";

  useEffect(() => {
    console.error("Impact Stories page error:", error);
  }, [error]);

  return (
    <div className={`min-h-screen py-12 ${isDark ? "bg-gray-900" : "bg-[#90d2dc]"}`}>
      <div className="max-w-xl mx-auto px-4">
        <div className="text-center">
          <FaExclamationTriangle 
            className={`mx-auto text-6xl mb-6 ${isDark ? "text-red-400" : "text-red-600"}`}
          />
          
          <h2 className={`text-3xl font-bold mb-4 ${isDark ? "text-white" : "text-gray-900"}`}>
            Error Loading Impact Stories
          </h2>
          
          <p className={`mb-8 ${isDark ? "text-gray-300" : "text-gray-600"}`}>
            We encountered an error while trying to load the impact stories. Please try again or return to the homepage.
          </p>
          
          <div className="space-x-4">
            <button
              onClick={reset}
              className={`inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white ${
                isDark ? "bg-blue-600 hover:bg-blue-700" : "bg-blue-500 hover:bg-blue-600"
              } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-300`}
            >
              Try again
            </button>
            
            <button
              onClick={() => router.push("/")}
              className={`inline-flex items-center px-6 py-3 border text-base font-medium rounded-md ${
                isDark
                  ? "border-gray-600 text-gray-300 hover:bg-gray-800"
                  : "border-gray-300 text-gray-700 bg-white hover:bg-gray-50"
              } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-300`}
            >
              Return to Homepage
            </button>
          </div>

          {error.message && (
            <div className={`mt-8 p-4 rounded-md ${
              isDark ? "bg-red-900/50 text-red-200" : "bg-red-50 text-red-700"
            }`}>
              <p className="text-sm">
                Error details: {error.message}
              </p>
              {error.digest && (
                <p className="text-sm mt-1">
                  Error code: {error.digest}
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}