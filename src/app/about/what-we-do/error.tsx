"use client";

import { useTheme } from "@/context/ThemeContext";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const { theme } = useTheme();

  return (
    <div className={`min-h-screen flex items-center justify-center p-4 ${
      theme === "dark" ? "bg-gray-900" : "bg-gray-100"
    }`}>
      <div className={`max-w-md w-full rounded-lg shadow-lg p-8 ${
        theme === "dark" ? "bg-gray-800" : "bg-white"
      }`}>
        <h2 className="text-2xl font-bold mb-4 text-red-600">
          Something went wrong!
        </h2>
        <p className={`mb-6 ${
          theme === "dark" ? "text-gray-300" : "text-gray-600"
        }`}>
          {error.message || "Failed to load the What We Do page"}
        </p>
        <button
          onClick={reset}
          className="w-full px-4 py-2 rounded-md bg-green-600 hover:bg-green-700 text-white transition-colors duration-200"
        >
          Try again
        </button>
      </div>
    </div>
  );
}
