export default function CreateBlogLoading() {
  return (
    <div className="min-h-screen py-12 bg-gray-100">
      <div className="max-w-4xl mx-auto px-4">
        <div className="animate-pulse">
          {/* Title Skeleton */}
          <div className="h-10 w-72 bg-gray-200 rounded mb-8 mx-auto" />
          
          {/* Form Fields Skeleton */}
          <div className="space-y-6">
            {/* Title Input Skeleton */}
            <div>
              <div className="h-4 w-20 bg-gray-200 rounded mb-2" />
              <div className="h-10 w-full bg-gray-200 rounded" />
            </div>
            
            {/* Author Input Skeleton */}
            <div>
              <div className="h-4 w-24 bg-gray-200 rounded mb-2" />
              <div className="h-10 w-full bg-gray-200 rounded" />
            </div>
            
            {/* Content Textarea Skeleton */}
            <div>
              <div className="h-4 w-28 bg-gray-200 rounded mb-2" />
              <div className="h-40 w-full bg-gray-200 rounded" />
            </div>
            
            {/* Image Upload Skeleton */}
            <div>
              <div className="h-4 w-20 bg-gray-200 rounded mb-2" />
              <div className="h-10 w-full bg-gray-200 rounded" />
            </div>
            
            {/* Video Section Skeleton */}
            <div>
              <div className="flex items-center mb-2">
                <div className="h-4 w-4 bg-gray-200 rounded mr-2" />
                <div className="h-4 w-32 bg-gray-200 rounded" />
              </div>
              <div className="h-10 w-full bg-gray-200 rounded" />
            </div>
            
            {/* Tags Section Skeleton */}
            <div>
              <div className="h-4 w-16 bg-gray-200 rounded mb-2" />
              <div className="flex flex-wrap gap-2 mb-2">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="h-8 w-20 bg-gray-200 rounded-full" />
                ))}
              </div>
              <div className="flex">
                <div className="flex-grow h-10 bg-gray-200 rounded-l" />
                <div className="w-24 h-10 bg-gray-300 rounded-r" />
              </div>
            </div>
            
            {/* Submit Button Skeleton */}
            <div className="h-10 w-full bg-gray-300 rounded" />
          </div>
        </div>
      </div>
    </div>
  );
}