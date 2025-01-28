"use client";

import { useTheme } from '@/context/ThemeContext';
import { FaSpinner } from 'react-icons/fa';

export default function ImpactStoriesLoading() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <div className={`min-h-screen py-12 ${isDark ? 'bg-gray-900' : 'bg-[#90d2dc]'}`}>
      {/* Centered Spinner */}
      <div className="flex justify-center mb-8">
        <FaSpinner className={`animate-spin text-6xl ${isDark ? 'text-white' : 'text-black'}`} />
      </div>
      <div className="max-w-6xl mx-auto px-4">
        {/* Title Skeleton */}
        <div className="h-12 w-64 bg-gray-200 dark:bg-gray-700 rounded-lg mx-auto mb-12 animate-pulse" />

        {/* Blog Posts Skeletons */}
        {[1, 2, 3, 4].map((index) => (
          <div
            key={index}
            className="mb-12 rounded-lg shadow-lg overflow-hidden bg-[#90d2dc] dark:bg-gray-800 max-w-4xl mx-auto"
          >
            <div className="p-6">
              {/* Title Skeleton */}
              <div className="h-8 w-3/4 bg-gray-200 dark:bg-gray-700 rounded mb-2 mx-auto animate-pulse" />

              {/* Author Skeleton */}
              <div className="h-4 w-32 bg-gray-200 dark:bg-gray-700 rounded mb-2 mx-auto animate-pulse" />

              {/* Date Skeleton */}
              <div className="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded mb-4 mx-auto animate-pulse" />

              {/* Media Skeleton */}
              <div className="w-full aspect-video bg-gray-200 dark:bg-gray-700 rounded mb-4 animate-pulse" />

              {/* Content Skeleton */}
              <div className="space-y-2 mb-4">
                <div className="h-4 w-full bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                <div className="h-4 w-5/6 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                <div className="h-4 w-4/6 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
              </div>

              {/* Tags Skeleton */}
              <div className="flex flex-wrap gap-2 mb-4">
                {[1, 2, 3].map((tagIndex) => (
                  <div
                    key={tagIndex}
                    className="h-6 w-16 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse"
                  />
                ))}
              </div>

              {/* Button Skeleton */}
              <div className="flex justify-center">
                <div className="h-10 w-32 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
              </div>
            </div>
          </div>
        ))}

        {/* Pagination Skeleton */}
        <div className="flex justify-center items-center mt-8 space-x-2">
          {[1, 2, 3, 4, 5].map((index) => (
            <div
              key={index}
              className="h-8 w-8 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
