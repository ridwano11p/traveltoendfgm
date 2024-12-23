export default function EditVideoLoading() {
  return (
    <div className="min-h-screen py-12 bg-gray-100">
      <div className="max-w-6xl mx-auto px-4">
        {/* Title Skeleton */}
        <div className="h-12 w-48 bg-gray-200 rounded-md mb-8 mx-auto" />

        {/* Grid of Video Cards Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Generate 6 skeleton cards */}
          {[...Array(6)].map((_, index) => (
            <div key={index} className="p-6 rounded-lg shadow-md bg-white animate-pulse">
              {/* Video Thumbnail Skeleton */}
              <div className="relative">
                <div className="w-full h-48 bg-gray-200 rounded-md mb-4" />
                {/* Play Icon Placeholder */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-12 h-12 bg-gray-300 rounded-full" />
                </div>
              </div>

              {/* Title Skeleton */}
              <div className="h-8 bg-gray-200 rounded-md w-3/4 mb-2" />

              {/* Description Lines */}
              <div className="space-y-2 mb-4">
                <div className="h-4 bg-gray-200 rounded-md w-full" />
                <div className="h-4 bg-gray-200 rounded-md w-5/6" />
                <div className="h-4 bg-gray-200 rounded-md w-4/6" />
              </div>

              {/* Action Buttons Skeleton */}
              <div className="flex justify-center space-x-4">
                <div className="h-10 w-24 bg-gray-200 rounded-md" />
                <div className="h-10 w-24 bg-gray-200 rounded-md" />
              </div>
            </div>
          ))}
        </div>

        {/* Edit Form Skeleton (hidden by default) */}
        <div className="hidden space-y-6">
          {/* Title Input Skeleton */}
          <div>
            <div className="h-4 w-16 bg-gray-200 rounded mb-2" />
            <div className="h-12 w-full bg-gray-200 rounded" />
          </div>

          {/* Description Input Skeleton */}
          <div>
            <div className="h-4 w-24 bg-gray-200 rounded mb-2" />
            <div className="h-32 w-full bg-gray-200 rounded" />
          </div>

          {/* Video Type Toggle Skeleton */}
          <div className="flex items-center space-x-4">
            <div className="h-6 w-32 bg-gray-200 rounded" />
            <div className="h-6 w-32 bg-gray-200 rounded" />
          </div>

          {/* Video Upload/URL Input Skeleton */}
          <div>
            <div className="h-4 w-32 bg-gray-200 rounded mb-2" />
            <div className="h-12 w-full bg-gray-200 rounded" />
          </div>

          {/* Thumbnail Upload Skeleton */}
          <div>
            <div className="h-4 w-32 bg-gray-200 rounded mb-2" />
            <div className="h-12 w-full bg-gray-200 rounded" />
          </div>

          {/* Action Buttons Skeleton */}
          <div className="flex justify-end space-x-4">
            <div className="h-10 w-24 bg-gray-200 rounded" />
            <div className="h-10 w-32 bg-gray-200 rounded" />
            <div className="h-10 w-40 bg-gray-200 rounded" />
          </div>
        </div>
      </div>
    </div>
  );
}