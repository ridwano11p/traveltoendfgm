"use client";

import { useTheme } from '@/context/ThemeContext';

export default function Loading() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <div className={`min-h-screen flex items-center justify-center ${isDark ? 'bg-gray-900' : 'bg-[#90d2dc]'}`}>
      <div className="text-center">
        <div className={`inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 ${
          isDark ? 'border-white' : 'border-gray-900'
        } mb-4`}></div>
        <h2 className={`text-xl font-semibold ${isDark ? 'text-white' : 'text-gray-800'}`}>
          Loading Edit Dashboard...
        </h2>
      </div>
    </div>
  );
}