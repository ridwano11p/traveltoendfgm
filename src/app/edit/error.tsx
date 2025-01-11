"use client";

import { useEffect } from 'react';
import { useTheme } from '@/context/ThemeContext';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  useEffect(() => {
    console.error('Edit page error:', error);
  }, [error]);

  return (
    <div className={`min-h-screen flex items-center justify-center ${isDark ? 'bg-gray-900' : 'bg-[#90d2dc]'}`}>
      <div className={`max-w-xl p-6 text-center ${isDark ? 'text-white' : 'text-gray-800'}`}>
        <h2 className="text-2xl font-bold mb-4">Something went wrong!</h2>
        <p className="mb-4">We apologize for the inconvenience. Please try again.</p>
        <button
          onClick={reset}
          className={`px-4 py-2 rounded ${
            isDark 
              ? 'bg-blue-600 hover:bg-blue-700 text-white' 
              : 'bg-blue-500 hover:bg-blue-600 text-white'
          } transition duration-300`}
        >
          Try again
        </button>
      </div>
    </div>
  );
}