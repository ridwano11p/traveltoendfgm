export default function SearchResultsLoading() {
  return (
    <div className="min-h-screen py-12 bg-[#90d2dc] dark:bg-gray-900">
      <div className="max-w-6xl mx-auto px-4">
        {/* Title Skeleton */}
        <div className="h-10 w-96 bg-gray-200 dark:bg-gray-700 rounded-lg mx-auto mb-8 animate-pulse" />

        {/* Results Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Generate 6 skeleton cards */}
          {[1, 2, 3, 4, 5, 6].map((index) => (
            <div
              key={index}
              className="rounded-lg shadow-md overflow-hidden bg-white dark:bg-gray-800"
            >
              {/* Media Container Skeleton */}
              <div className="aspect-video bg-gray-200 dark:bg-gray-700 animate-pulse" />

              <div className="p-6 space-y-4">
                {/* Title Skeleton */}
                <div className="h-6 w-3/4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />

                {/* Author/Date Skeleton */}
                <div className="space-y-2">
                  <div className="h-4 w-1/2 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                  <div className="h-4 w-1/3 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                </div>

                {/* Content Skeleton */}
                <div className="space-y-2">
                  <div className="h-4 w-full bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                  <div className="h-4 w-5/6 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                  <div className="h-4 w-4/6 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                </div>

                {/* Tags Skeleton */}
                <div className="flex flex-wrap gap-2">
                  {[1, 2, 3].map((tagIndex) => (
                    <div
                      key={tagIndex}
                      className="h-6 w-16 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse"
                    />
                  ))}
                </div>

                {/* Button Skeleton */}
                <div className="flex justify-center">
                  <div className="h-10 w-32 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* No Results Message Skeleton (hidden by default) */}
        <div className="hidden mt-8">
          <div className="h-6 w-64 bg-gray-200 dark:bg-gray-700 rounded mx-auto animate-pulse" />
        </div>
      </div>
    </div>
  );
}