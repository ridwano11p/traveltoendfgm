export default function CreateBannerLoading() {
  return (
    <div className="min-h-screen py-12 bg-gray-100">
      <div className="max-w-4xl mx-auto px-4">
        <div className="animate-pulse">
          {/* Title Skeleton */}
          <div className="h-10 w-64 bg-gray-200 rounded mb-8 mx-auto" />
          
          {/* Form Skeleton */}
          <div className="space-y-6">
            {/* Title Input Skeleton */}
            <div>
              <div className="h-4 w-20 bg-gray-200 rounded mb-2" />
              <div className="h-10 w-full bg-gray-200 rounded" />
            </div>
            
            {/* Description Input Skeleton */}
            <div>
              <div className="h-4 w-32 bg-gray-200 rounded mb-2" />
              <div className="h-32 w-full bg-gray-200 rounded" />
            </div>
            
            {/* Media Type Selection Skeleton */}
            <div className="flex items-center space-x-4">
              <div className="h-6 w-40 bg-gray-200 rounded" />
              <div className="h-6 w-40 bg-gray-200 rounded" />
            </div>
            
            {/* File Upload/URL Input Skeleton */}
            <div>
              <div className="h-4 w-36 bg-gray-200 rounded mb-2" />
              <div className="h-10 w-full bg-gray-200 rounded" />
            </div>
            
            {/* Submit Button Skeleton */}
            <div className="h-10 w-full bg-gray-200 rounded" />
          </div>
        </div>
      </div>
    </div>
  );
}