export default function Loading() {
  return (
    <div className="min-h-screen py-12 bg-gray-100 dark:bg-gray-900">
      <div className="max-w-6xl mx-auto px-4">
        <div className="animate-pulse">
          {/* Header skeleton */}
          <div className="h-12 w-3/4 mx-auto bg-gray-200 dark:bg-gray-700 rounded-lg mb-8" />
          
          {/* Grid skeleton */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(9)].map((_, index) => (
              <div key={index} className="p-6 rounded-lg bg-gray-200 dark:bg-gray-800">
                {/* Title skeleton */}
                <div className="h-6 w-3/4 bg-gray-300 dark:bg-gray-700 rounded mb-4" />
                {/* Description skeleton */}
                <div className="h-4 w-full bg-gray-300 dark:bg-gray-700 rounded mb-2" />
                <div className="h-4 w-2/3 bg-gray-300 dark:bg-gray-700 rounded" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}