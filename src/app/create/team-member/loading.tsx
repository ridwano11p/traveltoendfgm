export default function CreateTeamMemberLoading() {
  return (
    <div className="min-h-screen py-12 bg-gray-100">
      <div className="max-w-4xl mx-auto px-4">
        <div className="animate-pulse">
          {/* Title Skeleton */}
          <div className="h-10 w-64 bg-gray-200 rounded mb-8 mx-auto" />
          
          {/* Form Fields Skeleton */}
          <div className="space-y-6">
            {/* Name Input Skeleton */}
            <div>
              <div className="h-4 w-20 bg-gray-200 rounded mb-2" />
              <div className="h-12 w-full bg-gray-200 rounded" />
            </div>
            
            {/* Role Input Skeleton */}
            <div>
              <div className="h-4 w-16 bg-gray-200 rounded mb-2" />
              <div className="h-12 w-full bg-gray-200 rounded" />
            </div>
            
            {/* Bio Textarea Skeleton */}
            <div>
              <div className="h-4 w-12 bg-gray-200 rounded mb-2" />
              <div className="h-32 w-full bg-gray-200 rounded" />
            </div>
            
            {/* Image Upload Skeleton */}
            <div>
              <div className="h-4 w-28 bg-gray-200 rounded mb-2" />
              <div className="h-12 w-full bg-gray-200 rounded" />
            </div>
            
            {/* Social Media URLs Skeleton */}
            <div className="space-y-4">
              {/* LinkedIn */}
              <div>
                <div className="h-4 w-24 bg-gray-200 rounded mb-2" />
                <div className="h-12 w-full bg-gray-200 rounded" />
              </div>
              
              {/* Twitter */}
              <div>
                <div className="h-4 w-20 bg-gray-200 rounded mb-2" />
                <div className="h-12 w-full bg-gray-200 rounded" />
              </div>
              
              {/* YouTube */}
              <div>
                <div className="h-4 w-24 bg-gray-200 rounded mb-2" />
                <div className="h-12 w-full bg-gray-200 rounded" />
              </div>
              
              {/* Facebook */}
              <div>
                <div className="h-4 w-24 bg-gray-200 rounded mb-2" />
                <div className="h-12 w-full bg-gray-200 rounded" />
              </div>
            </div>
            
            {/* Buttons Container Skeleton */}
            <div className="flex justify-end space-x-4">
              <div className="h-10 w-24 bg-gray-200 rounded" />
              <div className="h-10 w-40 bg-gray-300 rounded" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}