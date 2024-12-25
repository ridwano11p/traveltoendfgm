export default function SearchLoading() {
  return (
    <div className="min-h-screen bg-[#90d2dc] dark:bg-gray-900">
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Title Skeleton */}
        <div className="h-10 w-64 bg-gray-200 dark:bg-gray-700 rounded-lg mx-auto mb-8 animate-pulse" />

        {/* Search Form Skeleton */}
        <div className="flex flex-col sm:flex-row mb-8">
          {/* Search Input Skeleton */}
          <div className="flex-grow h-12 bg-gray-200 dark:bg-gray-700 rounded-t-md sm:rounded-l-md sm:rounded-t-none animate-pulse" />
          
          {/* Select Box Skeleton */}
          <div className="h-12 w-32 bg-gray-200 dark:bg-gray-700 animate-pulse" />
          
          {/* Button Skeleton */}
          <div className="h-12 w-24 bg-gray-200 dark:bg-gray-700 rounded-b-md sm:rounded-r-md sm:rounded-b-none animate-pulse" />
        </div>

        {/* Help Text Skeleton */}
        <div className="space-y-2 text-center">
          <div className="h-4 w-3/4 bg-gray-200 dark:bg-gray-700 rounded mx-auto animate-pulse" />
          <div className="h-4 w-2/3 bg-gray-200 dark:bg-gray-700 rounded mx-auto animate-pulse" />
        </div>
      </div>
    </div>
  );
}