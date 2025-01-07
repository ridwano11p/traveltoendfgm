import { FaSpinner } from "react-icons/fa";

export default function Loading() {
  return (
    <div className="min-h-screen bg-[#90d2dc] flex items-center justify-center">
      <FaSpinner className="animate-spin text-4xl text-gray-800" />
    </div>
  );
}
