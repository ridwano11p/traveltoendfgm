"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FaSearch, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "@/context/ThemeContext";
import Banner from "@/components/shared/Banner";
import MediaContent from "@/components/shared/MediaContent";
import { HomeClientProps } from "../types";

const formatContent = (content: string) => {
  return content.split("\n").map((paragraph, index) => (
    <p key={index} className="mb-4">
      {paragraph}
    </p>
  ));
};

export default function HomeClient({ initialData }: HomeClientProps) {
  const { theme } = useTheme();
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [searchType, setSearchType] = useState("all");
  const [currentSlide, setCurrentSlide] = useState(0);
  const { blogs, featureStory } = initialData;
  const isDark = theme === 'dark';

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      const encodedSearch = encodeURIComponent(searchTerm.trim());
      router.push(`/search/${encodedSearch}?type=${searchType}`);
    }
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % 4);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + 4) % 4);
  };

  const handleTagClick = (tag: string) => {
    router.push(`/tag/${encodeURIComponent(tag)}`);
  };

  const renderLatestImpactStories = () => {
    if (currentSlide === 3) {
      return (
        <div className="flex flex-col items-center justify-center h-full min-h-[400px] landscape:min-h-[300px]">
          <h3 className={`text-2xl font-semibold mb-4 ${isDark ? "text-white" : "text-gray-800"}`}>
            Discover More Impact Stories
          </h3>
          <Link
            href="/impact-stories"
            className={`inline-block px-6 py-3 rounded-md ${
              isDark ? "bg-green-600 hover:bg-green-700" : "bg-green-500 hover:bg-green-600"
            } text-white transition duration-300`}
          >
            Read More Stories
          </Link>
        </div>
      );
    }

    const story = blogs[currentSlide];
    if (!story) return null;

    return (
      <>
        <MediaContent
          imageUrl={story.imageUrl}
          videoUrl={story.videoUrl}
          isYouTubeVideo={story.isYouTubeVideo}
          title={story.title}
        />
        <div className="p-6">
          <h3 className={`text-2xl font-semibold mb-4 ${isDark ? "text-white" : "text-gray-800"}`}>
            {story.title}
          </h3>
          <div className={`mb-4 ${isDark ? "text-gray-300" : "text-gray-600"}`}>
            {formatContent(story.content.substring(0, 200) + "...")}
          </div>
          <div className="mb-4">
            {story.tags && story.tags.length > 0 ? (
              story.tags.map((tag: string) => (
                <button
                  key={tag}
                  onClick={() => handleTagClick(tag)}
                  className={`inline-block px-2 py-1 rounded-full text-sm font-semibold mr-2 mb-2 cursor-pointer ${
                    isDark ? "bg-gray-700 text-gray-300 hover:bg-gray-600" : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
                >
                  {tag}
                </button>
              ))
            ) : (
              <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-500"}`}>
                No tags available
              </p>
            )}
          </div>
          <Link
            href={`/article/${story.id}`}
            className={`inline-block px-6 py-3 rounded-md ${
              isDark ? "bg-green-600 hover:bg-green-700" : "bg-green-500 hover:bg-green-600"
            } text-white transition duration-300`}
          >
            Read More
          </Link>
        </div>
      </>
    );
  };

  return (
    <div className={`min-h-screen w-full overflow-x-hidden ${isDark ? "bg-gray-900" : "bg-[#90d2dc]"} landscape:min-h-[500px]`}>
      <Banner />
      <div className="w-full px-4 py-8 landscape:py-4 md:py-12 md:max-w-6xl md:mx-auto">
        {/* Enhanced Search Bar */}
        <div className="mb-12 md:mb-20">
          <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-2 md:max-w-3xl md:mx-auto md:shadow-lg md:rounded-lg md:bg-opacity-50">
            <div className="flex min-w-0 flex-1 md:p-1">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search..."
                className={`flex-1 min-w-[140px] p-2.5 md:p-4 text-sm md:text-base rounded-l-lg ${
                  isDark
                    ? "bg-gray-800 text-white border-gray-700 hover:bg-gray-750"
                    : "bg-white text-gray-900 border-gray-200 hover:bg-gray-50"
                } border focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors`}
              />
              <select
                value={searchType}
                onChange={(e) => setSearchType(e.target.value)}
                className={`w-[90px] p-2.5 md:p-4 text-xs md:text-sm border-x-0 ${
                  isDark
                    ? "bg-gray-700 text-white border-gray-600"
                    : "bg-gray-100 text-gray-900 border-gray-200"
                } border focus:outline-none sm:w-[120px] sm:text-sm`}
              >
                <option value="all">All</option>
                <option value="blogs">Blogs</option>
                <option value="featureStories">Stories</option>
                <option value="photos">Photos</option>
                <option value="videos">Videos</option>
                <option value="pdfs">PDFs</option>
                <option value="team_members">Team</option>
              </select>
              <button
                type="submit"
                className={`p-2.5 md:p-4 rounded-r-lg flex items-center justify-center w-11 md:w-16 ${
                  isDark
                    ? "bg-blue-600 hover:bg-blue-700"
                    : "bg-blue-500 hover:bg-blue-600"
                } text-white transition-colors active:scale-95`}
              >
                <FaSearch className="text-base sm:text-lg md:text-xl" />
              </button>
            </div>
          </form>
        </div>

        {/* Feature Story */}
        {featureStory && (
          <div className="mb-16">
            <h2 className={`text-3xl font-semibold mb-6 ${isDark ? "text-white" : "text-gray-800"}`}>
              Featured Story
            </h2>
            <div className={`rounded-lg shadow-md overflow-hidden ${isDark ? "bg-gray-800" : "bg-[#90d2dc]"}`}>
              <MediaContent
                imageUrl={featureStory?.imageUrl ?? ''}
                videoUrl={featureStory?.videoUrl ?? ''}
                isYouTubeVideo={featureStory?.isYouTubeVideo ?? false}
                title={featureStory?.title ?? ''}
              />
              <div className="p-6">
                <h3 className={`text-2xl font-semibold mb-4 ${isDark ? "text-white" : "text-gray-800"}`}>
                  {featureStory?.title}
                </h3>
                <div className={`mb-4 ${isDark ? "text-gray-300" : "text-gray-600"}`}>
                  {formatContent(featureStory?.content?.substring(0, 200) + "...")}
                </div>
                <div className="mb-4">
                  {featureStory?.tags && featureStory.tags.length > 0 ? (
                    featureStory.tags.map((tag: string) => (
                      <button
                        key={tag}
                        onClick={() => handleTagClick(tag)}
                        className={`inline-block px-2 py-1 rounded-full text-sm font-semibold mr-2 mb-2 cursor-pointer ${
                          isDark ? "bg-gray-700 text-gray-300 hover:bg-gray-600" : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                        }`}
                      >
                        {tag}
                      </button>
                    ))
                  ) : (
                    <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-500"}`}>
                      No tags available
                    </p>
                  )}
                </div>
                <Link
                  href={`/article/${featureStory.id}`}
                  className={`inline-block px-6 py-3 rounded-md ${
                    isDark ? "bg-green-600 hover:bg-green-700" : "bg-green-500 hover:bg-green-600"
                  } text-white transition duration-300`}
                >
                  Read More
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Latest Impact Stories Slider */}
        {blogs.length > 0 && (
          <div className="mb-16">
            <h2 className={`text-3xl font-semibold mb-6 ${isDark ? "text-white" : "text-gray-800"}`}>
              Latest Impact Stories
            </h2>
            <div className="relative">
              <button
                onClick={prevSlide}
                className="absolute left-0 top-1/2 -translate-y-1/2 z-10 -ml-3 md:-ml-6 bg-white/90 hover:bg-white rounded-full p-4 md:p-5 focus:outline-none shadow-lg transition-colors touch-manipulation active:scale-95"
                aria-label="Previous story"
              >
                <FaChevronLeft size={24} className="text-green-600" />
              </button>
              <div className="w-full px-12 md:px-16">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentSlide}
                    initial={{ opacity: 0, x: 300 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -300 }}
                    transition={{ duration: 0.5 }}
                    className={`rounded-lg shadow-md overflow-hidden ${isDark ? "bg-gray-800" : "bg-[#90d2dc]"}`}
                  >
                    {renderLatestImpactStories()}
                  </motion.div>
                </AnimatePresence>
              </div>
              <button
                onClick={nextSlide}
                className="absolute right-0 top-1/2 -translate-y-1/2 z-10 -mr-3 md:-mr-6 bg-white/90 hover:bg-white rounded-full p-4 md:p-5 focus:outline-none shadow-lg transition-colors touch-manipulation active:scale-95"
                aria-label="Next story"
              >
                <FaChevronRight size={24} className="text-green-600" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
