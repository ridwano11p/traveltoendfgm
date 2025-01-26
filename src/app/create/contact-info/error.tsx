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
      isDark ? 'bg-gray-900' : 'bg-gray-100'
    }`}>
      <div className={`max-w-md w-full rounded-lg shadow-lg p-8 ${
        isDark ? 'bg-gray-800' : 'bg-white'
      }`}>
        <div className="text-center">
          <FaExclamationTriangle className="text-5xl mb-4 text-red-600 mx-auto" />
          <h2 className="text-2xl font-bold mb-4 text-red-600">
            Error Creating Contact Information
          </h2>
          <p className={`mb-6 ${
            isDark ? 'text-gray-300' : 'text-gray-600'
          }`}>
            {error.message || "Failed to create contact information. Please try again."}
          </p>
          <button
            onClick={reset}
            className="w-full px-4 py-2 rounded-md bg-green-600 hover:bg-green-700 text-white transition-colors duration-200"
          >
            Try again
          </button>
        </div>
      </div>
    </div>
  );
}
