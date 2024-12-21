export default function HomeLoading() {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="animate-pulse">
        {/* Feature Story Skeleton */}
        <div className="w-full h-[500px] bg-gray-200" />
        
        {/* Latest Stories Section */}
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="h-8 w-64 bg-gray-200 rounded mb-8" />
          
          {/* Blog Posts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
                {/* Image Placeholder */}
                <div className="w-full h-48 bg-gray-200" />
                
                {/* Content */}
                <div className="p-6 space-y-4">
                  {/* Title */}
                  <div className="h-6 w-3/4 bg-gray-200 rounded" />
                  
                  {/* Description */}
                  <div className="space-y-2">
                    <div className="h-4 w-full bg-gray-200 rounded" />
                    <div className="h-4 w-5/6 bg-gray-200 rounded" />
                    <div className="h-4 w-4/6 bg-gray-200 rounded" />
                  </div>
                  
                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {[...Array(3)].map((_, tagIndex) => (
                      <div key={tagIndex} className="h-6 w-16 bg-gray-200 rounded-full" />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Call to Action Section */}
        <div className="w-full bg-gray-200 py-16">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <div className="h-10 w-3/4 bg-gray-300 rounded mx-auto mb-6" />
            <div className="h-6 w-2/3 bg-gray-300 rounded mx-auto mb-8" />
            <div className="h-12 w-48 bg-gray-300 rounded mx-auto" />
          </div>
        </div>
      </div>
    </div>
  );
}