"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useTheme } from "@/context/ThemeContext";
import { FaExclamationTriangle, FaRedo, FaUndo } from "react-icons/fa";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function HomeError({ error, reset }: ErrorProps) {
  const router = useRouter();
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  
  useEffect(() => {
    console.error("Home page error:", error);
  }, [error]);

  return (
    <div className={`min-h-screen flex items-center justify-center p-4 ${
      isDark ? 'bg-gray-900' : 'bg-gray-100'
    }`}>
      <div className={`max-w-md w-full rounded-lg shadow-lg p-8 ${
        isDark ? 'bg-gray-800' : 'bg-white'
      }`}>
        <div className="text-center">
          <FaExclamationTriangle className="text-5xl mb-4 text-red-600 mx-auto" />
          <h2 className="text-2xl font-bold mb-4 text-red-600">
            Something went wrong!
          </h2>
          <p className={`mb-6 ${
            isDark ? 'text-gray-300' : 'text-gray-600'
          }`}>
            We encountered an error while loading the homepage content. Please try refreshing the page.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-3 justify-center">
            <button
              onClick={reset}
              className="flex items-center justify-center px-4 py-2 rounded-md bg-green-600 hover:bg-green-700 text-white transition-colors duration-200"
            >
              <FaUndo className="mr-2" /> Try again
            </button>
            <button
              onClick={() => router.refresh()}
              className={`flex items-center justify-center px-4 py-2 rounded-md transition-colors duration-200 ${
                isDark
                  ? 'bg-gray-700 hover:bg-gray-600 text-white'
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-900'
              }`}
            >
              <FaRedo className="mr-2" /> Refresh Page
            </button>
          </div>
          {error.message && (
            <div className={`mt-6 p-4 rounded-md ${
              isDark ? 'bg-red-900/20' : 'bg-red-50'
            }`}>
              <p className={`text-sm ${
                isDark ? 'text-red-400' : 'text-red-700'
              }`}>
                Error details: {error.message}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}