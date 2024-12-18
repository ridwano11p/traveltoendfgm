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
    console.error(error);
  }, [error]);

  return (
    <div className={`min-h-screen flex flex-col items-center justify-center p-4 ${
      theme === "dark" ? "bg-gray-900 text-white" : "bg-[#90d2dc] text-gray-900"
    }`}>
      <h2 className="text-2xl font-bold mb-4">Something went wrong!</h2>
      <p className="mb-4 text-center max-w-md">
        {error.message || "An unexpected error occurred. Please try again later."}
      </p>
      <button
        onClick={reset}
        className={`px-4 py-2 rounded-md ${
          theme === "dark"
            ? "bg-blue-600 hover:bg-blue-700"
            : "bg-blue-500 hover:bg-blue-600"
        } text-white transition-colors`}
      >
        Try again
      </button>
    </div>
  );
}