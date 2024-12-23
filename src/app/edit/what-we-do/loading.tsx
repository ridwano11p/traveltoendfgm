export default function EditWhatWeDoLoading() {
  return (
    <div className="min-h-screen py-12 bg-gray-100">
      <div className="max-w-4xl mx-auto px-4">
        {/* Title Skeleton */}
        <div className="h-12 w-64 bg-gray-200 rounded-md mb-8 mx-auto" />

        {/* Form Skeleton */}
        <div className="space-y-6">
          {/* Mission Input Skeleton */}
          <div>
            <div className="h-4 w-24 bg-gray-200 rounded mb-2" />
            <div className="h-32 w-full bg-gray-200 rounded" />
          </div>

          {/* Approach Input Skeleton */}
          <div>
            <div className="h-4 w-28 bg-gray-200 rounded mb-2" />
            <div className="h-32 w-full bg-gray-200 rounded" />
          </div>

          {/* Impact Input Skeleton */}
          <div>
            <div className="h-4 w-24 bg-gray-200 rounded mb-2" />
            <div className="h-32 w-full bg-gray-200 rounded" />
          </div>

          {/* Image Upload Skeleton */}
          <div>
            <div className="h-4 w-24 bg-gray-200 rounded mb-2" />
            <div className="h-12 w-full bg-gray-200 rounded" />
          </div>

          {/* Current Image Skeleton */}
          <div>
            <div className="h-4 w-32 bg-gray-200 rounded mb-2" />
            <div className="h-64 w-full bg-gray-200 rounded" />
          </div>

          {/* Submit Button Skeleton */}
          <div className="flex justify-end">
            <div className="h-10 w-32 bg-gray-200 rounded" />
          </div>
        </div>
      </div>
    </div>
  );
}