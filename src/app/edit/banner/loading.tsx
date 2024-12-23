export default function EditBannerLoading() {
  return (
    <div className="min-h-screen py-12 bg-gray-100">
      <div className="max-w-6xl mx-auto px-4">
        {/* Title Skeleton */}
        <div className="h-10 w-64 bg-gray-200 rounded mb-8 mx-auto" />
        
        {/* Banner Grid Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Generate 6 banner card skeletons */}
          {[...Array(6)].map((_, index) => (
            <div key={index} className="p-6 rounded-lg shadow-md bg-white">
              {/* Media Placeholder */}
              <div className="relative mb-4">
                <div className="w-full h-48 bg-gray-200 rounded-md animate-pulse" />
                {/* Media Type Icon Placeholder */}
                <div className="absolute top-2 right-2 w-8 h-8 bg-gray-300 rounded-full" />
              </div>
              
              {/* Title Placeholder */}
              <div className="h-8 bg-gray-200 rounded mb-2 animate-pulse" />
              
              {/* Description Placeholder */}
              <div className="space-y-2 mb-4">
                <div className="h-4 bg-gray-200 rounded w-full animate-pulse" />
                <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse" />
                <div className="h-4 bg-gray-200 rounded w-1/2 animate-pulse" />
              </div>
              
              {/* Action Buttons Placeholder */}
              <div className="flex justify-center space-x-4">
                <div className="h-10 w-24 bg-gray-200 rounded animate-pulse" />
                <div className="h-10 w-24 bg-gray-200 rounded animate-pulse" />
              </div>
            </div>
          ))}
        </div>
        
        {/* Edit Form Skeleton (hidden by default) */}
        <div className="hidden">
          <div className="space-y-6">
            <div className="h-12 bg-gray-200 rounded animate-pulse" />
            <div className="h-32 bg-gray-200 rounded animate-pulse" />
            <div className="h-12 bg-gray-200 rounded animate-pulse" />
            <div className="flex justify-end space-x-4">
              <div className="h-10 w-24 bg-gray-200 rounded animate-pulse" />
              <div className="h-10 w-24 bg-gray-200 rounded animate-pulse" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}