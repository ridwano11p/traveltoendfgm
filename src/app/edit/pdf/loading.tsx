export default function EditPDFLoading() {
  return (
    <div className="min-h-screen py-12 bg-gray-100">
      <div className="max-w-6xl mx-auto px-4">
        {/* Title Skeleton */}
        <div className="h-12 w-48 bg-gray-200 rounded-md mb-8 mx-auto" />

        {/* Grid of PDF Cards Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Generate 6 skeleton cards */}
          {[...Array(6)].map((_, index) => (
            <div key={index} className="p-6 rounded-lg shadow-md bg-white animate-pulse">
              {/* PDF Icon and Title */}
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gray-200 rounded-md mr-4" />
                <div className="h-8 w-3/4 bg-gray-200 rounded-md" />
              </div>

              {/* Description Lines */}
              <div className="space-y-3 mb-4">
                <div className="h-4 bg-gray-200 rounded-md w-full" />
                <div className="h-4 bg-gray-200 rounded-md w-5/6" />
                <div className="h-4 bg-gray-200 rounded-md w-4/6" />
              </div>

              {/* File Name */}
              <div className="h-4 bg-gray-200 rounded-md w-2/3 mb-4" />

              {/* Action Buttons */}
              <div className="flex justify-center space-x-4">
                <div className="h-10 w-24 bg-gray-200 rounded-md" />
                <div className="h-10 w-24 bg-gray-200 rounded-md" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}