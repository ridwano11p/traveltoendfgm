"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FaSearch } from 'react-icons/fa';
import { SearchType } from '../types';
import { useTheme } from '@/context/ThemeContext';

export default function SearchForm() {
  const router = useRouter();
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const [searchTerm, setSearchTerm] = useState('');
  const [searchType, setSearchType] = useState<SearchType>('all');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      const query = encodeURIComponent(searchTerm.trim());
      router.push(`/search/${query}?type=${searchType}`);
    }
  };

  return (
    <form onSubmit={handleSearch} className="flex flex-col sm:flex-row mb-8">
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Enter your search term"
        className={`flex-grow p-3 rounded-t-md sm:rounded-l-md sm:rounded-t-none ${
          isDark ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'
        } border ${isDark ? 'border-gray-700' : 'border-gray-300'}`}
      />
      <select
        value={searchType}
        onChange={(e) => setSearchType(e.target.value as SearchType)}
        className={`p-3 ${
          isDark ? 'bg-gray-700 text-white' : 'bg-gray-100 text-gray-900'
        } border ${isDark ? 'border-gray-600' : 'border-gray-300'}`}
      >
        <option value="all">All</option>
        <option value="blogs">Blogs</option>
        <option value="featureStories">Feature Stories</option>
        <option value="photos">Images</option>
        <option value="videos">Videos</option>
        <option value="pdfs">PDFs</option>
        <option value="team_members">Team Members</option>
      </select>
      <button
        type="submit"
        className={`p-3 rounded-b-md sm:rounded-r-md sm:rounded-b-none ${
          isDark ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'
        } text-white transition duration-300`}
      >
        <FaSearch className="inline mr-2" />
        Search
      </button>
    </form>
  );
}
