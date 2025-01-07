"use client";

import { useTheme } from '@/context/ThemeContext';
import SearchForm from './components/SearchForm';

export default function SearchClient() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <div className={`min-h-screen ${isDark ? 'bg-gray-900' : 'bg-[#90d2dc]'}`}>
      <div className="max-w-4xl mx-auto px-4 py-12">
        <h1 className={`text-3xl font-semibold mb-8 text-center ${isDark ? 'text-white' : 'text-gray-800'}`}>
          Search Our Content
        </h1>
        <SearchForm />
        <div className={`text-center ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
          <p>Use the search bar above to find content across our website.</p>
          <p>You can search for blogs, feature stories, images, videos, PDFs, and team members.</p>
        </div>
      </div>
    </div>
  );
}
