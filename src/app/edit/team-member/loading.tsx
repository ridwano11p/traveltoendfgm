export default function EditTeamMemberLoading() {
  return (
    <div className="min-h-screen py-12 bg-gray-100">
      <div className="max-w-6xl mx-auto px-4">
        {/* Title Skeleton */}
        <div className="h-12 w-64 bg-gray-200 rounded-md mb-8 mx-auto" />

        {/* Grid of Team Member Cards Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Generate 6 skeleton cards */}
          {[...Array(6)].map((_, index) => (
            <div key={index} className="p-6 rounded-lg shadow-md bg-white animate-pulse">
              {/* Profile Image Skeleton */}
              <div className="w-32 h-32 rounded-full bg-gray-200 mx-auto mb-4" />

              {/* Name Skeleton */}
              <div className="h-8 w-48 bg-gray-200 rounded-md mb-2 mx-auto" />

              {/* Role Skeleton */}
              <div className="h-6 w-36 bg-gray-200 rounded-md mb-2 mx-auto" />

              {/* Bio Lines Skeleton */}
              <div className="space-y-2 mb-4">
                <div className="h-4 bg-gray-200 rounded-md w-full" />
                <div className="h-4 bg-gray-200 rounded-md w-5/6" />
                <div className="h-4 bg-gray-200 rounded-md w-4/6" />
              </div>

              {/* Social Icons Skeleton */}
              <div className="flex justify-center space-x-4 mb-4">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="w-6 h-6 bg-gray-200 rounded-full" />
                ))}
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
          {/* Name Input Skeleton */}
          <div>
            <div className="h-4 w-16 bg-gray-200 rounded mb-2" />
            <div className="h-12 w-full bg-gray-200 rounded" />
          </div>

          {/* Role Input Skeleton */}
          <div>
            <div className="h-4 w-16 bg-gray-200 rounded mb-2" />
            <div className="h-12 w-full bg-gray-200 rounded" />
          </div>

          {/* Bio Input Skeleton */}
          <div>
            <div className="h-4 w-16 bg-gray-200 rounded mb-2" />
            <div className="h-32 w-full bg-gray-200 rounded" />
          </div>

          {/* Image Upload Skeleton */}
          <div>
            <div className="h-4 w-32 bg-gray-200 rounded mb-2" />
            <div className="h-12 w-full bg-gray-200 rounded" />
          </div>

          {/* Social Links Skeletons */}
          {[...Array(4)].map((_, index) => (
            <div key={index}>
              <div className="h-4 w-24 bg-gray-200 rounded mb-2" />
              <div className="h-12 w-full bg-gray-200 rounded" />
            </div>
          ))}

          {/* Action Buttons Skeleton */}
          <div className="flex justify-end space-x-4">
            <div className="h-10 w-24 bg-gray-200 rounded" />
            <div className="h-10 w-48 bg-gray-200 rounded" />
          </div>
        </div>
      </div>
    </div>
  );
}