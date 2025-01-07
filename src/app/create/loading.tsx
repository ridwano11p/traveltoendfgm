"use client";

import React from 'react';
import { useTheme } from '@/context/ThemeContext';

export default function CreateLoading(): React.JSX.Element {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <div className={`min-h-screen py-12 ${isDark ? 'bg-gray-900' : 'bg-[#90d2dc]'}`}>
      <div className="max-w-6xl mx-auto px-4">
        <div className="animate-pulse">
          <div className={`h-10 w-64 ${isDark ? 'bg-gray-800' : 'bg-gray-200'} rounded mb-8 mx-auto`} />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(9)].map((_, index) => (
              <div
                key={index}
                className={`block p-6 rounded-lg shadow-md ${
                  isDark ? 'bg-gray-800' : 'bg-gray-200'
                }`}
              >
                <div className={`h-6 w-3/4 ${isDark ? 'bg-gray-700' : 'bg-gray-300'} rounded mb-4`} />
                <div className={`h-4 w-full ${isDark ? 'bg-gray-700' : 'bg-gray-300'} rounded`} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
