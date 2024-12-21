"use client";

import { useEffect } from "react";
import { useTheme } from "@/context/ThemeContext";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const { theme } = useTheme();

  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className={`min-h-screen py-12 ${theme === 'dark' ? 'bg-gray-900' : 'bg-[#90d2dc]'}`}>
      <div className="max-w-6xl mx-auto px-4 text-center">
        <h2 className={`text-3xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
          Something went wrong!
        </h2>
        <p className={`mb-8 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
          {error.message || "An error occurred while loading the edit dashboard."}
        </p>
        <button
          onClick={reset}
          className={`px-6 py-3 rounded-md ${
            theme === 'dark' 
              ? 'bg-blue-600 hover:bg-blue-700 text-white' 
              : 'bg-blue-500 hover:bg-blue-600 text-white'
          } transition duration-300`}
        >
          Try again
        </button>
      </div>
    </div>
  );
}