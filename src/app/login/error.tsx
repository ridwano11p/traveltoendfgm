"use client";

import { useEffect } from 'react';
import { useTheme } from '@/context/ThemeContext';
import { FaExclamationTriangle } from 'react-icons/fa';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const { darkMode } = useTheme();

  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Login page error:', error);
  }, [error]);

  return (
    <div className={`min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 ${
      darkMode ? 'bg-gray-800' : 'bg-[#90d2dc]'
    }`}>
      <div className={`max-w-md w-full space-y-8 ${
        darkMode ? 'bg-gray-700' : 'bg-white'
      } p-10 rounded-xl shadow-md`}>
        <div className="text-center">
          <FaExclamationTriangle className={`mx-auto h-12 w-12 ${
            darkMode ? 'text-red-400' : 'text-red-500'
          }`} />
          <h2 className={`mt-4 text-2xl font-bold ${
            darkMode ? 'text-white' : 'text-gray-900'
          }`}>
            Something went wrong!
          </h2>
          <p className={`mt-2 text-sm ${
            darkMode ? 'text-gray-300' : 'text-gray-600'
          }`}>
            {error.message || 'An error occurred while loading the login page.'}
          </p>
          <button
            onClick={reset}
            className={`mt-6 px-4 py-2 rounded-md text-sm font-medium text-white ${
              darkMode
                ? 'bg-blue-600 hover:bg-blue-700'
                : 'bg-blue-600 hover:bg-blue-700'
            } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 ease-in-out`}
          >
            Try again
          </button>
        </div>
      </div>
    </div>
  );
}