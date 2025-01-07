"use client";

import { useTheme } from '@/context/ThemeContext';
import { FaSpinner } from 'react-icons/fa';

export default function Loading() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <div className={`min-h-screen flex items-center justify-center ${
      isDark ? 'bg-gray-900' : 'bg-[#90d2dc]'
    }`}>
      <FaSpinner className={`animate-spin text-6xl ${
        isDark ? 'text-white' : 'text-gray-800'
      }`} />
    </div>
  );
}
