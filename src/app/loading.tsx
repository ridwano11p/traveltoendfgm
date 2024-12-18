import { FaSpinner } from "react-icons/fa";

export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#90d2dc] dark:bg-gray-900">
      <div className="flex flex-col items-center space-y-4">
        <FaSpinner className="animate-spin text-6xl text-gray-800 dark:text-white" />
        <p className="text-lg font-medium text-gray-800 dark:text-white">
          Loading...
        </p>
      </div>
    </div>
  );
}