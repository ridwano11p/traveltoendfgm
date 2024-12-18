import { FaSpinner } from 'react-icons/fa';

export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-teal-700 to-teal-900">
      <div className="text-center">
        <FaSpinner className="h-12 w-12 text-white animate-spin mx-auto" />
        <h2 className="mt-4 text-xl font-semibold text-white">Loading...</h2>
      </div>
    </div>
  );
}