export default function EditBlogLoading() {
  return (
    <div className="min-h-screen py-12 bg-gray-100">
      <div className="max-w-6xl mx-auto px-4">
        {/* Title Skeleton */}
        <div className="h-10 w-64 bg-gray-200 rounded mb-8 mx-auto" />
        
        {/* Blog List Skeleton */}
        <div className="space-y-6">
          {/* Generate 3 blog card skeletons */}
          {[...Array(3)].map((_, index) => (
            <div key={index} className="p-6 rounded-lg shadow-md bg-white">
              {/* Title Skeleton */}
              <div className="h-8 bg-gray-200 rounded w-3/4 mb-2 animate-pulse" />
              
              {/* Author Skeleton */}
              <div className="h-4 bg-gray-200 rounded w-1/3 mb-2 animate-pulse" />
              
              {/* Content Preview Skeleton */}
              <div className="space-y-2 mb-4">
                <div className="h-4 bg-gray-200 rounded w-full animate-pulse" />
                <div className="h-4 bg-gray-200 rounded w-5/6 animate-pulse" />
                <div className="h-4 bg-gray-200 rounded w-4/6 animate-pulse" />
              </div>
              
              {/* Tags Skeleton */}
              <div className="flex flex-wrap mb-4">
                {[...Array(3)].map((_, tagIndex) => (
                  <div
                    key={tagIndex}
                    className="h-6 w-20 bg-gray-200 rounded-full mr-2 mb-2 animate-pulse"
                  />
                ))}
              </div>
              
              {/* Action Buttons Skeleton */}
              <div className="flex justify-end space-x-4">
                <div className="h-10 w-24 bg-gray-200 rounded animate-pulse" />
                <div className="h-10 w-24 bg-gray-200 rounded animate-pulse" />
              </div>
            </div>
          ))}
        </div>
        
        {/* Edit Form Skeleton (hidden by default) */}
        <div className="hidden">
          <div className="space-y-6">
            {/* Title Input Skeleton */}
            <div>
              <div className="h-4 w-20 bg-gray-200 rounded mb-2" />
              <div className="h-12 w-full bg-gray-200 rounded" />
            </div>
            
            {/* Author Input Skeleton */}
            <div>
              <div className="h-4 w-24 bg-gray-200 rounded mb-2" />
              <div className="h-12 w-full bg-gray-200 rounded" />
            </div>
            
            {/* Content Textarea Skeleton */}
            <div>
              <div className="h-4 w-28 bg-gray-200 rounded mb-2" />
              <div className="h-40 w-full bg-gray-200 rounded" />
            </div>
            
            {/* Media Upload Skeleton */}
            <div>
              <div className="h-4 w-32 bg-gray-200 rounded mb-2" />
              <div className="h-12 w-full bg-gray-200 rounded" />
            </div>
            
            {/* Tags Input Skeleton */}
            <div>
              <div className="h-4 w-16 bg-gray-200 rounded mb-2" />
              <div className="flex">
                <div className="h-12 flex-grow bg-gray-200 rounded-l" />
                <div className="h-12 w-24 bg-gray-300 rounded-r" />
              </div>
            </div>
            
            {/* Action Buttons Skeleton */}
            <div className="flex justify-end space-x-4">
              <div className="h-10 w-24 bg-gray-200 rounded" />
              <div className="h-10 w-32 bg-gray-300 rounded" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}