import { FaSpinner } from "react-icons/fa";

export default function ArticleLoading() {
  return (
    <div className="min-h-screen bg-[#90d2dc] dark:bg-gray-900">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="rounded-lg shadow-lg overflow-hidden bg-[#90d2dc] dark:bg-gray-800">
          {/* Media Skeleton */}
          <div className="w-full aspect-video bg-gray-200 dark:bg-gray-700 animate-pulse" />
          
          <div className="p-6 md:p-10">
            {/* Title Skeleton */}
            <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded-md mb-4 animate-pulse" />
            
            {/* Author and Date Skeleton */}
            <div className="flex flex-wrap items-center mb-6">
              <div className="h-4 w-32 bg-gray-200 dark:bg-gray-700 rounded-md mr-6 mb-2 animate-pulse" />
              <div className="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded-md mb-2 animate-pulse" />
            </div>
            
            {/* Tags Skeleton */}
            <div className="mb-6 flex flex-wrap">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="h-6 w-20 bg-gray-200 dark:bg-gray-700 rounded-full mr-2 mb-2 animate-pulse"
                />
              ))}
            </div>
            
            {/* Content Skeleton */}
            <div className="space-y-4">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="h-4 bg-gray-200 dark:bg-gray-700 rounded-md animate-pulse"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}