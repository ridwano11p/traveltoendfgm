export default function CreateWhatWeDoLoading() {
  return (
    <div className="min-h-screen py-12 bg-gray-100">
      <div className="max-w-4xl mx-auto px-4">
        <div className="animate-pulse">
          {/* Title Skeleton */}
          <div className="h-10 w-96 bg-gray-200 rounded mb-8 mx-auto" />
          
          {/* Form Fields Skeleton */}
          <div className="space-y-6">
            {/* Mission Textarea Skeleton */}
            <div>
              <div className="h-4 w-28 bg-gray-200 rounded mb-2" />
              <div className="h-40 w-full bg-gray-200 rounded" />
            </div>
            
            {/* Approach Textarea Skeleton */}
            <div>
              <div className="h-4 w-32 bg-gray-200 rounded mb-2" />
              <div className="h-40 w-full bg-gray-200 rounded" />
            </div>
            
            {/* Impact Textarea Skeleton */}
            <div>
              <div className="h-4 w-24 bg-gray-200 rounded mb-2" />
              <div className="h-40 w-full bg-gray-200 rounded" />
            </div>
            
            {/* Image Upload Skeleton */}
            <div>
              <div className="h-4 w-20 bg-gray-200 rounded mb-2" />
              <div className="h-12 w-full bg-gray-200 rounded" />
            </div>
            
            {/* Submit Button Skeleton */}
            <div className="h-12 w-full bg-gray-300 rounded mt-8" />
          </div>
          
          {/* Error Message Placeholder */}
          <div className="h-16 w-full bg-gray-200 rounded mt-4" />
        </div>
      </div>
    </div>
  );
}