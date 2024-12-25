"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useTheme } from "@/context/ThemeContext";
import { FaSearch } from "react-icons/fa";

interface SearchClientProps {
  initialSearchTerm?: string;
  initialSearchType?: string;
}

export default function SearchClient({
  initialSearchTerm = "",
  initialSearchType = "all"
}: SearchClientProps) {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const router = useRouter();

  const [searchTerm, setSearchTerm] = useState(initialSearchTerm);
  const [searchType, setSearchType] = useState(initialSearchType);
  const [error, setError] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const trimmedSearchTerm = searchTerm.trim();
    if (!trimmedSearchTerm) {
      setError("Please enter a search term");
      return;
    }

    router.push(`/search/results?q=${encodeURIComponent(trimmedSearchTerm)}&type=${searchType}`);
  };

  return (
    <div className={`min-h-screen ${isDark ? "bg-gray-900" : "bg-[#90d2dc]"}`}>
      <div className="max-w-4xl mx-auto px-4 py-12">
        <h1 className={`text-3xl font-semibold mb-8 text-center ${
          isDark ? "text-white" : "text-gray-800"
        }`}>
          Search Our Content
        </h1>

        <form 
          onSubmit={handleSearch} 
          className="flex flex-col sm:flex-row mb-8"
          role="search"
          aria-label="Site content search"
        >
          <div className="flex-grow">
            <label htmlFor="search-input" className="sr-only">
              Search term
            </label>
            <input
              id="search-input"
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Enter your search term"
              className={`w-full p-3 rounded-t-md sm:rounded-l-md sm:rounded-t-none ${
                isDark 
                  ? "bg-gray-800 text-white border-gray-700" 
                  : "bg-white text-gray-900 border-gray-300"
              } border focus:outline-none focus:ring-2 focus:ring-blue-500`}
              aria-invalid={!!error}
              aria-describedby={error ? "search-error" : undefined}
            />
          </div>

          <div>
            <label htmlFor="search-type" className="sr-only">
              Content type
            </label>
            <select
              id="search-type"
              value={searchType}
              onChange={(e) => setSearchType(e.target.value)}
              className={`w-full sm:w-auto p-3 ${
                isDark 
                  ? "bg-gray-700 text-white border-gray-600" 
                  : "bg-gray-100 text-gray-900 border-gray-300"
              } border focus:outline-none focus:ring-2 focus:ring-blue-500`}
            >
              <option value="all">All</option>
              <option value="blogs">Blogs</option>
              <option value="featureStories">Feature Stories</option>
              <option value="photos">Images</option>
              <option value="videos">Videos</option>
              <option value="pdfs">PDFs</option>
              <option value="team_members">Team Members</option>
            </select>
          </div>

          <button
            type="submit"
            className={`p-3 rounded-b-md sm:rounded-r-md sm:rounded-b-none ${
              isDark 
                ? "bg-blue-600 hover:bg-blue-700" 
                : "bg-blue-500 hover:bg-blue-600"
            } text-white transition duration-300 flex items-center justify-center`}
            aria-label="Search"
          >
            <FaSearch className="inline mr-2" aria-hidden="true" />
            <span>Search</span>
          </button>
        </form>

        {error && (
          <div 
            id="search-error"
            className={`text-center mb-4 ${
              isDark ? "text-red-400" : "text-red-600"
            }`}
            role="alert"
          >
            {error}
          </div>
        )}

        <div className={`text-center ${isDark ? "text-gray-300" : "text-gray-600"}`}>
          <p className="mb-2">
            Use the search bar above to find content across our website.
          </p>
          <p>
            You can search for blogs, feature stories, images, videos, PDFs, and team members.
          </p>
        </div>
      </div>
    </div>
  );
}