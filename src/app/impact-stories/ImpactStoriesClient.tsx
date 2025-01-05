"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useTheme } from "@/context/ThemeContext";
import { AnimatePresence } from "framer-motion";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import BlogPost from "./BlogPost";

interface BlogPost {
  id: string;
  title: string;
  content: string;
  author?: string;
  date?: string;
  imageUrl?: string;
  videoUrl?: string;
  isYouTubeVideo?: boolean;
  tags?: string[];
}

interface ImpactStoriesClientProps {
  blogs: BlogPost[];
  totalPages: number;
  currentPage: number;
}

export default function ImpactStoriesClient({
  blogs,
  totalPages,
  currentPage: initialPage
}: ImpactStoriesClientProps) {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(initialPage);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
      router.push(`/impact-stories?page=${newPage}`);
    }
  };

  const handleFirstPage = () => handlePageChange(1);
  const handleLastPage = () => handlePageChange(totalPages);

  const handleTagClick = (tag: string) => {
    router.push(`/tag/${encodeURIComponent(tag)}`);
  };

  const renderPageNumbers = () => {
    if (totalPages <= 1) return null;

    const pageNumbers = [];
    let startPage: number;
    let endPage: number;

    if (currentPage <= 3) {
      startPage = 1;
      endPage = Math.min(5, totalPages);
    } else if (currentPage >= totalPages - 2) {
      startPage = Math.max(1, totalPages - 4);
      endPage = totalPages;
    } else {
      startPage = currentPage - 2;
      endPage = currentPage + 2;
    }

    // First page button
    if (startPage > 1) {
      pageNumbers.push(
        <button
          key="first"
          onClick={() => handlePageChange(1)}
          className={`mx-1 px-3 py-1 rounded transition duration-300 ${
            isDark ? "bg-gray-700 text-gray-300 hover:bg-gray-600" : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          1
        </button>
      );
      if (startPage > 2) {
        pageNumbers.push(
          <span key="dots-start" className={`mx-1 ${isDark ? "text-gray-300" : "text-gray-700"}`}>
            ...
          </span>
        );
      }
    }

    // Page numbers
    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`mx-1 px-3 py-1 rounded transition duration-300 ${
            i === currentPage
              ? isDark ? "bg-blue-600 text-white" : "bg-blue-500 text-white"
              : isDark ? "bg-gray-700 text-gray-300 hover:bg-gray-600" : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          {i}
        </button>
      );
    }

    // Last page button
    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pageNumbers.push(
          <span key="dots-end" className={`mx-1 ${isDark ? "text-gray-300" : "text-gray-700"}`}>
            ...
          </span>
        );
      }
      pageNumbers.push(
        <button
          key="last"
          onClick={() => handlePageChange(totalPages)}
          className={`mx-1 px-3 py-1 rounded transition duration-300 ${
            isDark ? "bg-gray-700 text-gray-300 hover:bg-gray-600" : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          {totalPages}
        </button>
      );
    }

    return pageNumbers;
  };

  return (
    <div className={`min-h-screen py-12 ${isDark ? "bg-gray-900" : "bg-[#90d2dc]"}`}>
      <div className="max-w-6xl mx-auto px-4">
        <h1 className={`text-5xl font-bold mb-12 text-center ${isDark ? "text-white" : "text-gray-800"}`}>
          Impact Stories
        </h1>

        <AnimatePresence mode="wait">
          {blogs.map((post) => (
            <BlogPost
              key={post.id}
              post={post}
              isDark={isDark}
              onTagClick={handleTagClick}
            />
          ))}
        </AnimatePresence>

        {totalPages > 1 && (
          <div className="flex justify-center items-center mt-8 space-x-2">
            <button
              onClick={handleFirstPage}
              disabled={currentPage === 1}
              className={`px-3 py-1 rounded transition duration-300 ${
                isDark ? "bg-gray-700 text-gray-300 hover:bg-gray-600" : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              } ${currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""}`}
            >
              <FaArrowLeft />
            </button>

            {renderPageNumbers()}

            <button
              onClick={handleLastPage}
              disabled={currentPage === totalPages}
              className={`px-3 py-1 rounded transition duration-300 ${
                isDark ? "bg-gray-700 text-gray-300 hover:bg-gray-600" : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              } ${currentPage === totalPages ? "opacity-50 cursor-not-allowed" : ""}`}
            >
              <FaArrowRight />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
