export default function WhoWeAreLoading() {
  return (
    <div className="min-h-screen py-12 bg-[#90d2dc] dark:bg-gray-900">
      <div className="max-w-6xl mx-auto px-4">
        {/* Title Skeleton */}
        <div className="h-10 w-48 bg-gray-200 dark:bg-gray-700 rounded-lg mx-auto mb-8 animate-pulse" />

        {/* Team Members Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((index) => (
            <div 
              key={index}
              className="p-6 rounded-lg shadow-md bg-[#90d2dc] dark:bg-gray-800"
            >
              {/* Image Skeleton */}
              <div className="w-32 h-32 rounded-full mx-auto mb-4 bg-gray-200 dark:bg-gray-700 animate-pulse" />
              
              {/* Name Skeleton */}
              <div className="h-6 w-3/4 bg-gray-200 dark:bg-gray-700 rounded mx-auto mb-2 animate-pulse" />
              
              {/* Role Skeleton */}
              <div className="h-4 w-1/2 bg-gray-200 dark:bg-gray-700 rounded mx-auto mb-4 animate-pulse" />
              
              {/* Bio Skeleton */}
              <div className="space-y-2 mb-4">
                <div className="h-3 w-full bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                <div className="h-3 w-5/6 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                <div className="h-3 w-4/6 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
              </div>
              
              {/* Button Skeleton */}
              <div className="h-10 w-full bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}