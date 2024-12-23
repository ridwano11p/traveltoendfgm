"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { FaExclamationTriangle } from "react-icons/fa";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function EditVideoError({ error, reset }: ErrorProps) {
  const router = useRouter();
  
  useEffect(() => {
    // Log the error to an error reporting service
    console.error("Video editing error:", error);
  }, [error]);

  return (
    <div className="min-h-screen py-12 bg-gray-50">
      <div className="max-w-xl mx-auto px-4">
        <div className="text-center">
          <FaExclamationTriangle className="mx-auto h-12 w-12 text-red-500 mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Error Managing Videos
          </h2>
          <p className="text-gray-600 mb-8">
            We encountered an error while managing the videos. Please try again or return to the dashboard.
          </p>
          <div className="space-x-4">
            <button
              onClick={reset}
              className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Try again
            </button>
            <button
              onClick={() => router.push('/edit')}
              className="inline-flex items-center px-4 py-2 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Return to Edit Dashboard
            </button>
          </div>
          {error.message && (
            <div className="mt-6 p-4 bg-red-50 rounded-md">
              <p className="text-sm text-red-700">
                Error details: {error.message}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}