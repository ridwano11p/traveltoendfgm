"use client";

import { FaSpinner } from "react-icons/fa";
import { useTheme } from "@/context/ThemeContext";

export default function Loading() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <div className={`min-h-screen flex items-center justify-center ${
      isDark ? 'bg-gray-900' : 'bg-[#90d2dc]'
    }`}>
      <div className="text-center">
        <FaSpinner className={`animate-spin text-6xl mb-4 ${
          isDark ? 'text-white' : 'text-black'
        }`} />
        <p className={`text-lg ${
          isDark ? 'text-white' : 'text-black'
        }`}>
          Loading article...
        </p>
      </div>
    </div>
  );
}
