"use client";

import React from 'react';
import { useTheme } from '@/context/ThemeContext';

export default function Loading(): React.JSX.Element {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <div className={`min-h-screen py-12 ${isDark ? 'bg-gray-900' : 'bg-[#90d2dc]'}`}>
      <div className="max-w-6xl mx-auto px-4">
        <div className="animate-pulse">
          {/* Header skeleton */}
          <div className={`h-12 w-3/4 mx-auto ${
            isDark ? 'bg-gray-800' : 'bg-gray-200'
          } rounded-lg mb-8`} />

          {/* Grid skeleton */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(9)].map((_, index) => (
              <div
                key={index}
                className={`p-6 rounded-lg ${isDark ? 'bg-gray-800' : 'bg-gray-200'}`}
              >
                {/* Title skeleton */}
                <div className={`h-6 w-3/4 ${
                  isDark ? 'bg-gray-700' : 'bg-gray-300'
                } rounded mb-4`} />
                {/* Description skeleton */}
                <div className={`h-4 w-full ${
                  isDark ? 'bg-gray-700' : 'bg-gray-300'
                } rounded mb-2`} />
                <div className={`h-4 w-2/3 ${
                  isDark ? 'bg-gray-700' : 'bg-gray-300'
                } rounded`} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
