export default function Loading() {
    return (
      <div className="min-h-screen bg-[#90d2dc] py-12">
        <div className="max-w-2xl mx-auto px-4">
          <div className="h-10 w-48 bg-gray-200 rounded mb-8 mx-auto" />
          <div className="p-6 rounded-lg bg-white shadow-lg animate-pulse">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center mb-4">
                <div className="w-8 h-8 bg-gray-200 rounded-full mr-4" />
                <div>
                  <div className="h-4 w-20 bg-gray-200 rounded mb-2" />
                  <div className="h-4 w-32 bg-gray-200 rounded" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
  