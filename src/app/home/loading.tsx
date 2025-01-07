"use client";

import React from 'react';
import { useTheme } from '@/context/ThemeContext';

export default function HomeLoading(): React.JSX.Element {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <div className={`min-h-screen ${isDark ? 'bg-gray-900' : 'bg-[#90d2dc]'}`}>
      <div className="animate-pulse">
        {/* Feature Story Skeleton */}
        <div className={`w-full h-[500px] ${isDark ? 'bg-gray-800' : 'bg-gray-200'}`} />

        {/* Latest Stories Section */}
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className={`h-8 w-64 ${isDark ? 'bg-gray-800' : 'bg-gray-200'} rounded mb-8`} />

          {/* Blog Posts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, index) => (
              <div
                key={index}
                className={`rounded-lg shadow-md overflow-hidden ${
                  isDark ? 'bg-gray-800' : 'bg-white'
                }`}
              >
                {/* Image Placeholder */}
                <div className={`w-full h-48 ${isDark ? 'bg-gray-700' : 'bg-gray-200'}`} />

                {/* Content */}
                <div className="p-6 space-y-4">
                  {/* Title */}
                  <div className={`h-6 w-3/4 ${
                    isDark ? 'bg-gray-700' : 'bg-gray-200'
                  } rounded`} />

                  {/* Description */}
                  <div className="space-y-2">
                    {[...Array(3)].map((_, lineIndex) => (
                      <div
                        key={lineIndex}
                        className={`h-4 ${lineIndex === 2 ? 'w-4/6' : lineIndex === 1 ? 'w-5/6' : 'w-full'} ${
                          isDark ? 'bg-gray-700' : 'bg-gray-200'
                        } rounded`}
                      />
                    ))}
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {[...Array(3)].map((_, tagIndex) => (
                      <div
                        key={tagIndex}
                        className={`h-6 w-16 ${
                          isDark ? 'bg-gray-700' : 'bg-gray-200'
                        } rounded-full`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action Section */}
        <div className={`w-full ${isDark ? 'bg-gray-800' : 'bg-gray-200'} py-16`}>
          <div className="max-w-4xl mx-auto px-4 text-center">
            <div className={`h-10 w-3/4 ${
              isDark ? 'bg-gray-700' : 'bg-gray-300'
            } rounded mx-auto mb-6`} />
            <div className={`h-6 w-2/3 ${
              isDark ? 'bg-gray-700' : 'bg-gray-300'
            } rounded mx-auto mb-8`} />
            <div className={`h-12 w-48 ${
              isDark ? 'bg-gray-700' : 'bg-gray-300'
            } rounded mx-auto`} />
          </div>
        </div>
      </div>
    </div>
  );
}
