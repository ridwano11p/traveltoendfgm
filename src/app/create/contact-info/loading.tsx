export default function CreateContactInfoLoading() {
  return (
    <div className="min-h-screen py-12 bg-gray-100">
      <div className="max-w-2xl mx-auto px-4">
        <div className="animate-pulse">
          {/* Title Skeleton */}
          <div className="h-10 w-80 bg-gray-200 rounded mb-8 mx-auto" />
          
          {/* Form Fields Skeleton */}
          <div className="space-y-6">
            {/* Email Input Skeleton */}
            <div>
              <div className="h-4 w-16 bg-gray-200 rounded mb-2" />
              <div className="h-12 w-full bg-gray-200 rounded" />
            </div>
            
            {/* Phone Input Skeleton */}
            <div>
              <div className="h-4 w-20 bg-gray-200 rounded mb-2" />
              <div className="h-12 w-full bg-gray-200 rounded" />
            </div>
            
            {/* Location Input Skeleton */}
            <div>
              <div className="h-4 w-24 bg-gray-200 rounded mb-2" />
              <div className="h-12 w-full bg-gray-200 rounded" />
            </div>
            
            {/* Submit Button Skeleton */}
            <div className="h-12 w-full bg-gray-300 rounded mt-8" />
          </div>
        </div>
      </div>
    </div>
  );
}