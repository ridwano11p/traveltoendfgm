"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen bg-[#90d2dc] flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold text-red-600 mb-4">
          Error Creating Banner
        </h2>
        <p className="text-gray-600 mb-4">
          {error.message || "Failed to create banner. Please try again."}
        </p>
        <button
          onClick={reset}
          className="bg-teal-600 text-white px-4 py-2 rounded hover:bg-teal-700 transition-colors"
        >
          Try again
        </button>
      </div>
    </div>
  );
}
