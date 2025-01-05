import { FaSpinner } from "react-icons/fa";

export default function Loading() {
  return (
    <div className="flex justify-center items-center h-screen bg-[#90d2dc]">
      <FaSpinner className="animate-spin text-6xl text-gray-800" />
    </div>
  );
}
