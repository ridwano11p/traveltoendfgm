"use client";

import Link from 'next/link';
import { useTheme } from '@/context/ThemeContext';
import { CreateOptionProps } from '../types';

export default function CreateOption({ title, description, link, disabled }: CreateOptionProps) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  if (disabled) {
    return (
      <div className={`block p-6 rounded-lg shadow-md ${
        isDark ? 'bg-gray-700' : 'bg-gray-200'
      } opacity-50 cursor-not-allowed`}>
        <h3 className={`text-xl font-semibold mb-2 ${
          isDark ? 'text-white' : 'text-gray-800'
        }`}>
          {title}
        </h3>
        <p className={`${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
          {description}
        </p>
      </div>
    );
  }

  return (
    <Link
      href={link}
      className={`block p-6 rounded-lg shadow-md ${
        isDark ? 'bg-gray-800 hover:bg-gray-700' : 'bg-[#90d2dc] hover:bg-[#7fbfcc]'
      } transition duration-300`}
    >
      <h3 className={`text-xl font-semibold mb-2 ${
        isDark ? 'text-white' : 'text-gray-800'
      }`}>
        {title}
      </h3>
      <p className={`${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
        {description}
      </p>
    </Link>
  );
}
