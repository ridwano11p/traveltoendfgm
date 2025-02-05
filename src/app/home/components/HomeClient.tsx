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
        <div className="flex flex-col items-center justify-center h-full min-h-[300px] md:min-h-[400px] lg:min-h-[450px]">
          <h3 className={`text-xl md:text-2xl lg:text-3xl font-semibold mb-6 text-center px-4 ${isDark ? "text-white" : "text-gray-800"}`}>
            Discover More Impact Stories
          </h3>
          <Link
            href="/impact-stories"
            className={`inline-block px-6 py-3 rounded-lg text-sm md:text-base ${
              isDark ? "bg-green-600 hover:bg-green-700" : "bg-green-500 hover:bg-green-600"
            } text-white transition duration-300 transform hover:scale-105`}
          >
            Read More Stories
          </Link>
        </div>
      );
    }

    const story = blogs[currentSlide];
    if (!story) return null;

    return (
      <div className="flex flex-col md:flex-row md:items-stretch h-full">
        <div className="w-full md:w-1/2 relative overflow-hidden">
          <div className="aspect-w-16 aspect-h-9 md:aspect-none md:h-full">
            <MediaContent
              imageUrl={story.imageUrl}
              videoUrl={story.videoUrl}
              isYouTubeVideo={story.isYouTubeVideo}
              title={story.title}
            />
          </div>
        </div>
        <div className="w-full md:w-1/2 p-4 md:p-6 lg:p-8 flex flex-col justify-between">
          <div>
            <h3 className={`text-xl md:text-2xl lg:text-3xl font-semibold mb-4 ${isDark ? "text-white" : "text-gray-800"}`}>
              {story.title}
            </h3>
            <div className={`mb-6 text-sm md:text-base ${isDark ? "text-gray-300" : "text-gray-600"}`}>
              {formatContent(story.content.substring(0, 200) + "...")}
            </div>
            <div className="mb-6 flex flex-wrap gap-2">
              {story.tags && story.tags.length > 0 ? (
                story.tags.map((tag: string) => (
                  <button
                    key={tag}
                    onClick={() => handleTagClick(tag)}
                    className={`px-3 py-1 rounded-full text-xs md:text-sm font-medium transition-all ${
                      isDark ? "bg-gray-700 text-gray-300 hover:bg-gray-600" : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                    } hover:shadow-md`}
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
          </div>
          <Link
            href={`/article/${story.id}`}
            className={`inline-block px-6 py-3 rounded-lg text-sm md:text-base ${
              isDark ? "bg-green-600 hover:bg-green-700" : "bg-green-500 hover:bg-green-600"
            } text-white transition duration-300 transform hover:scale-105 text-center md:text-left`}
          >
            Read More
          </Link>
        </div>
      </div>
    );
  };

  return (
    <div className={`min-h-screen w-full overflow-x-hidden ${isDark ? "bg-gray-900" : "bg-gradient-to-b from-[#90d2dc] to-[#c7e8ef]"}`}>
      <Banner />
      <main className="w-full px-4 py-6 md:py-12 lg:py-16 max-w-7xl mx-auto">
        {/* Enhanced Search Bar */}
        <div className="mb-8 md:mb-12 lg:mb-16">
          <form onSubmit={handleSearch} className="max-w-3xl mx-auto backdrop-blur-sm rounded-xl p-2 md:p-3 shadow-lg">
            <div className="flex flex-col sm:flex-row gap-2">
              <div className="flex-1 flex">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search..."
                  className={`flex-1 px-4 py-3 text-sm md:text-base rounded-l-lg ${
                    isDark
                      ? "bg-gray-800/90 text-white border-gray-700 focus:bg-gray-800"
                      : "bg-white/90 text-gray-900 border-gray-200 focus:bg-white"
                  } border focus:outline-none focus:ring-2 focus:ring-green-500 transition-all`}
                />
                <select
                  value={searchType}
                  onChange={(e) => setSearchType(e.target.value)}
                  className={`w-24 sm:w-32 px-2 py-3 text-xs md:text-sm border-x-0 ${
                    isDark
                      ? "bg-gray-700/90 text-white border-gray-600 focus:bg-gray-700"
                      : "bg-gray-50/90 text-gray-900 border-gray-200 focus:bg-gray-50"
                  } border focus:outline-none focus:ring-2 focus:ring-green-500`}
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
                  className={`px-4 py-3 rounded-r-lg flex items-center justify-center w-12 sm:w-16 ${
                    isDark
                      ? "bg-green-600 hover:bg-green-700"
                      : "bg-green-500 hover:bg-green-600"
                  } text-white transition-all hover:shadow-lg active:scale-95`}
                  aria-label="Search"
                >
                  <FaSearch className="text-lg" />
                </button>
              </div>
            </div>
          </form>
        </div>

        {/* Feature Story */}
        {featureStory && (
          <section className="mb-12 md:mb-16 lg:mb-20">
            <h2 className={`text-2xl md:text-3xl lg:text-4xl font-bold mb-6 md:mb-8 ${isDark ? "text-white" : "text-gray-800"}`}>
              Featured Story
            </h2>
            <div className={`rounded-2xl shadow-xl overflow-hidden transform transition-all hover:scale-[1.02] ${
              isDark ? "bg-gray-800/90" : "bg-[#90d2dc]/10 backdrop-blur-sm"
            }`}>
              <div className="aspect-w-16 aspect-h-9 md:aspect-h-8 lg:aspect-h-7">
                <MediaContent
                  imageUrl={featureStory?.imageUrl ?? ''}
                  videoUrl={featureStory?.videoUrl ?? ''}
                  isYouTubeVideo={featureStory?.isYouTubeVideo ?? false}
                  title={featureStory?.title ?? ''}
                />
              </div>
              <div className="p-4 md:p-6 lg:p-8">
                <h3 className={`text-xl md:text-2xl lg:text-3xl font-semibold mb-4 ${isDark ? "text-white" : "text-gray-800"}`}>
                  {featureStory?.title}
                </h3>
                <div className={`mb-6 text-sm md:text-base ${isDark ? "text-gray-300" : "text-gray-600"}`}>
                  {formatContent(featureStory?.content?.substring(0, 200) + "...")}
                </div>
                <div className="mb-6 flex flex-wrap gap-2">
                  {featureStory?.tags && featureStory.tags.length > 0 ? (
                    featureStory.tags.map((tag: string) => (
                      <button
                        key={tag}
                        onClick={() => handleTagClick(tag)}
                        className={`px-3 py-1 rounded-full text-xs md:text-sm font-medium transition-all ${
                          isDark ? "bg-gray-700 text-gray-300 hover:bg-gray-600" : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                        } hover:shadow-md`}
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
                  className={`inline-block px-6 py-3 rounded-lg text-sm md:text-base ${
                    isDark ? "bg-green-600 hover:bg-green-700" : "bg-green-500 hover:bg-green-600"
                  } text-white transition-all hover:shadow-lg hover:scale-105`}
                >
                  Read More
                </Link>
              </div>
            </div>
          </section>
        )}

        {/* Latest Impact Stories Slider */}
        {blogs.length > 0 && (
          <section className="mb-12 md:mb-16">
            <h2 className={`text-2xl md:text-3xl lg:text-4xl font-bold mb-6 md:mb-8 ${isDark ? "text-white" : "text-gray-800"}`}>
              Latest Impact Stories
            </h2>
            <div className="relative">
              <button
                onClick={prevSlide}
                className="absolute left-0 top-1/2 -translate-y-1/2 z-10 -ml-3 md:-ml-6 bg-white/90 hover:bg-white rounded-full p-3 md:p-4 focus:outline-none shadow-lg transition-all hover:scale-110 active:scale-95"
                aria-label="Previous story"
              >
                <FaChevronLeft className="w-4 h-4 md:w-6 md:h-6 text-green-600" />
              </button>
              <div className="w-full px-8 md:px-12">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentSlide}
                    initial={{ opacity: 0, x: 300 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -300 }}
                    transition={{ duration: 0.5 }}
                    className={`rounded-2xl shadow-xl overflow-hidden ${
                      isDark ? "bg-gray-800/90" : "bg-[#90d2dc]/10 backdrop-blur-sm"
                    }`}
                  >
                    {renderLatestImpactStories()}
                  </motion.div>
                </AnimatePresence>
              </div>
              <button
                onClick={nextSlide}
                className="absolute right-0 top-1/2 -translate-y-1/2 z-10 -mr-3 md:-mr-6 bg-white/90 hover:bg-white rounded-full p-3 md:p-4 focus:outline-none shadow-lg transition-all hover:scale-110 active:scale-95"
                aria-label="Next story"
              >
                <FaChevronRight className="w-4 h-4 md:w-6 md:h-6 text-green-600" />
              </button>
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
