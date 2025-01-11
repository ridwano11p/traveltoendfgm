"use client";

import { useTheme } from "@/context/ThemeContext";
import { FaExclamationTriangle } from "react-icons/fa";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <div className={`min-h-screen flex items-center justify-center p-4 ${
      isDark ? 'bg-gray-900' : 'bg-[#90d2dc]'
    }`}>
      <div className={`max-w-md w-full p-6 rounded-lg shadow-xl ${
        isDark ? 'bg-gray-800' : 'bg-white'
      }`}>
        <div className="text-center mb-6">
          <FaExclamationTriangle className={`text-5xl mb-4 ${
            isDark ? 'text-red-400' : 'text-red-600'
          }`} />
          <h2 className={`text-2xl font-bold mb-2 ${
            isDark ? 'text-white' : 'text-gray-800'
          }`}>
            Error Creating Contact Information
          </h2>
          <p className={`mb-6 ${
            isDark ? 'text-gray-300' : 'text-gray-600'
          }`}>
            {error.message || "Failed to create contact information. Please try again."}
          </p>
          <button
            onClick={reset}
            className={`px-6 py-3 rounded-md transition-colors ${
              isDark
                ? 'bg-blue-600 hover:bg-blue-700 text-white'
                : 'bg-blue-500 hover:bg-blue-600 text-white'
            }`}
          >
            Try again
          </button>
        </div>
      </div>
    </div>
  );
}
