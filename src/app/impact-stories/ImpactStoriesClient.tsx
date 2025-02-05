"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useTheme } from "@/context/ThemeContext";
import { AnimatePresence, motion } from "framer-motion";
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

type PageNumberElement = React.ReactElement;

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
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleFirstPage = () => handlePageChange(1);
  const handleLastPage = () => handlePageChange(totalPages);
  const handlePrevPage = () => handlePageChange(currentPage - 1);
  const handleNextPage = () => handlePageChange(currentPage + 1);

  const handleTagClick = (tag: string) => {
    router.push(`/tag/${encodeURIComponent(tag)}`);
  };

  const renderPageNumbers = (): PageNumberElement[] | null => {
    if (totalPages <= 1) return null;

    const pageNumbers: PageNumberElement[] = [];
    let startPage: number;
    let endPage: number;

    // Desktop pagination
    const renderDesktopPagination = (): PageNumberElement[] => {
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

      if (startPage > 1) {
        pageNumbers.push(
          <button
            key="first"
            onClick={() => handlePageChange(1)}
            className={`hidden sm:block mx-1 px-4 py-2 rounded-lg transition-all duration-300 ${
              isDark 
                ? "bg-gray-700/90 text-gray-300 hover:bg-gray-600" 
                : "bg-[#90d2dc]/90 text-gray-700 hover:bg-[#90d2dc]"
            } hover:shadow-md`}
          >
            1
          </button>
        );
        if (startPage > 2) {
          pageNumbers.push(
            <span key="dots-start" className={`hidden sm:block mx-1 ${isDark ? "text-gray-300" : "text-gray-700"}`}>
              ...
            </span>
          );
        }
      }

      for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(
          <button
            key={i}
            onClick={() => handlePageChange(i)}
            className={`mx-1 px-4 py-2 rounded-lg transition-all duration-300 ${
              i === currentPage
                ? isDark 
                  ? "bg-green-600 text-white" 
                  : "bg-green-500 text-white"
                : isDark 
                  ? "bg-gray-700/90 text-gray-300 hover:bg-gray-600" 
                  : "bg-[#90d2dc]/90 text-gray-700 hover:bg-[#90d2dc]"
            } hover:shadow-md`}
          >
            {i}
          </button>
        );
      }

      if (endPage < totalPages) {
        if (endPage < totalPages - 1) {
          pageNumbers.push(
            <span key="dots-end" className={`hidden sm:block mx-1 ${isDark ? "text-gray-300" : "text-gray-700"}`}>
              ...
            </span>
          );
        }
        pageNumbers.push(
          <button
            key="last"
            onClick={() => handlePageChange(totalPages)}
            className={`hidden sm:block mx-1 px-4 py-2 rounded-lg transition-all duration-300 ${
              isDark 
                ? "bg-gray-700/90 text-gray-300 hover:bg-gray-600" 
                : "bg-[#90d2dc]/90 text-gray-700 hover:bg-[#90d2dc]"
            } hover:shadow-md`}
          >
            {totalPages}
          </button>
        );
      }

      return pageNumbers;
    };

    return renderDesktopPagination();
  };

  return (
    <div className={`min-h-screen ${
      isDark 
        ? 'bg-gradient-to-b from-gray-900 to-gray-800' 
        : 'bg-gradient-to-b from-[#90d2dc] to-[#c7e8ef]'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 lg:py-16">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12 md:mb-16"
        >
          <h1 className={`text-3xl md:text-4xl lg:text-5xl font-bold mb-4 ${
            isDark ? "text-white" : "text-gray-800"
          }`}>
            Impact Stories
          </h1>
          <p className={`text-lg md:text-xl max-w-3xl mx-auto ${
            isDark ? "text-gray-300" : "text-gray-600"
          }`}>
            Real stories of change and transformation in our mission to end FGM
          </p>
        </motion.div>

        {/* Blog Posts */}
        <AnimatePresence mode="wait">
          {blogs.length > 0 ? (
            <div className="space-y-8 md:space-y-12">
              {blogs.map((post) => (
                <BlogPost
                  key={post.id}
                  post={post}
                  isDark={isDark}
                  onTagClick={handleTagClick}
                />
              ))}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className={`text-center py-16 rounded-xl ${
                isDark ? "bg-gray-800/90" : "bg-[#90d2dc]/90"
              } backdrop-blur-sm shadow-lg`}
            >
              <p className={`text-lg ${isDark ? "text-gray-300" : "text-gray-600"}`}>
                No stories available at the moment.
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-12 md:mt-16">
            {/* Desktop Pagination */}
            <div className="hidden sm:flex justify-center items-center space-x-2">
              <button
                onClick={handleFirstPage}
                disabled={currentPage === 1}
                className={`px-4 py-2 rounded-lg transition-all duration-300 ${
                  isDark 
                    ? "bg-gray-700/90 text-gray-300 hover:bg-gray-600" 
                    : "bg-[#90d2dc]/90 text-gray-700 hover:bg-[#90d2dc]"
                } ${currentPage === 1 ? "opacity-50 cursor-not-allowed" : "hover:shadow-md"}`}
              >
                <FaArrowLeft className="w-4 h-4" />
              </button>
              
              {renderPageNumbers()}
              
              <button
                onClick={handleLastPage}
                disabled={currentPage === totalPages}
                className={`px-4 py-2 rounded-lg transition-all duration-300 ${
                  isDark 
                    ? "bg-gray-700/90 text-gray-300 hover:bg-gray-600" 
                    : "bg-[#90d2dc]/90 text-gray-700 hover:bg-[#90d2dc]"
                } ${currentPage === totalPages ? "opacity-50 cursor-not-allowed" : "hover:shadow-md"}`}
              >
                <FaArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Mobile Pagination */}
            <div className="sm:hidden flex justify-between items-center">
              <button
                onClick={handlePrevPage}
                disabled={currentPage === 1}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
                  isDark 
                    ? "bg-gray-700/90 text-gray-300 hover:bg-gray-600" 
                    : "bg-[#90d2dc]/90 text-gray-700 hover:bg-[#90d2dc]"
                } ${currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""} transition-all duration-300`}
              >
                <FaArrowLeft className="w-4 h-4" />
                <span>Previous</span>
              </button>
              
              <span className={isDark ? "text-gray-300" : "text-gray-700"}>
                Page {currentPage} of {totalPages}
              </span>
              
              <button
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
                  isDark 
                    ? "bg-gray-700/90 text-gray-300 hover:bg-gray-600" 
                    : "bg-[#90d2dc]/90 text-gray-700 hover:bg-[#90d2dc]"
                } ${currentPage === totalPages ? "opacity-50 cursor-not-allowed" : ""} transition-all duration-300`}
              >
                <span>Next</span>
                <FaArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
