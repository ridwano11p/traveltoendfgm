export default function WhatWeDoLoading() {
  return (
    <div className="min-h-screen bg-[#90d2dc] dark:bg-gray-900">
      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Title Skeleton */}
        <div className="h-10 w-48 bg-gray-200 dark:bg-gray-700 rounded-lg mx-auto mb-8 animate-pulse" />

        <div className="flex flex-col md:flex-row gap-8">
          {/* Content Section */}
          <div className="md:w-2/3 space-y-8">
            {/* Mission Section */}
            <div className="space-y-4">
              <div className="h-8 w-32 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
              <div className="space-y-2">
                <div className="h-4 w-full bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                <div className="h-4 w-5/6 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                <div className="h-4 w-4/6 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
              </div>
            </div>

            {/* Approach Section */}
            <div className="space-y-4">
              <div className="h-8 w-36 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
              <div className="space-y-2">
                <div className="h-4 w-full bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                <div className="h-4 w-5/6 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                <div className="h-4 w-4/6 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
              </div>
            </div>

            {/* Impact Section */}
            <div className="space-y-4">
              <div className="h-8 w-28 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
              <div className="space-y-2">
                <div className="h-4 w-full bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                <div className="h-4 w-5/6 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                <div className="h-4 w-4/6 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
              </div>
            </div>
          </div>

          {/* Image Skeleton */}
          <div className="md:w-1/3">
            <div className="w-full aspect-[3/4] bg-gray-200 dark:bg-gray-700 rounded-lg shadow-md animate-pulse sticky top-4" />
          </div>
        </div>
      </div>
    </div>
  );
}