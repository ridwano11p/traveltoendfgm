"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { FaSpinner, FaSearch, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "@/context/ThemeContext";
import Banner from "./Banner";
import MediaContent from "./MediaContent";
import type { BlogPost, FeatureStory } from "@/app/page";

interface HomeClientProps {
  initialData: {
    blogs: BlogPost[];
    featureStory: FeatureStory | null;
  };
}

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

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchTerm.trim())}&type=${searchType}`);
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
        <div className="flex flex-col items-center justify-center h-full min-h-[500px]">
          <h3 className={`text-2xl font-semibold mb-4 ${theme === "dark" ? "text-white" : "text-gray-800"}`}>
            Discover More Impact Stories
          </h3>
          <Link
            href="/impact-stories"
            className={`inline-block px-6 py-3 rounded-md ${
              theme === "dark" ? "bg-green-600 hover:bg-green-700" : "bg-green-500 hover:bg-green-600"
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
          <h3 className={`text-2xl font-semibold mb-4 ${theme === "dark" ? "text-white" : "text-gray-800"}`}>
            {story.title}
          </h3>
          <div className={`mb-4 ${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}>
            {formatContent(story.content.substring(0, 200) + "...")}
          </div>
          <div className="mb-4">
            {story.tags && story.tags.length > 0 ? (
              story.tags.map(tag => (
                <button
                  key={tag}
                  onClick={() => handleTagClick(tag)}
                  className={`inline-block px-2 py-1 rounded-full text-sm font-semibold mr-2 mb-2 cursor-pointer ${
                    theme === "dark" ? "bg-gray-700 text-gray-300 hover:bg-gray-600" : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
                >
                  {tag}
                </button>
              ))
            ) : (
              <p className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>No tags available</p>
            )}
          </div>
          <Link
            href={`/article/${story.id}`}
            className={`inline-block px-6 py-3 rounded-md ${
              theme === "dark" ? "bg-green-600 hover:bg-green-700" : "bg-green-500 hover:bg-green-600"
            } text-white transition duration-300`}
          >
            Read More
          </Link>
        </div>
      </>
    );
  };

  return (
    <div className={`min-h-screen w-full overflow-x-hidden ${theme === "dark" ? "bg-gray-900" : "bg-[#90d2dc]"}`}>
      <Banner />
      <div className="w-full px-4 py-12 md:max-w-6xl md:mx-auto">
        {/* Search Bar with Options */}
        <div className="mb-16">
          <form onSubmit={handleSearch} className="flex flex-col sm:flex-row">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search"
              className={`flex-grow p-2 rounded-t-md sm:rounded-l-md sm:rounded-t-none ${theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-gray-900"}`}
            />
            <select
              value={searchType}
              onChange={(e) => setSearchType(e.target.value)}
              className={`p-2 ${theme === "dark" ? "bg-gray-700 text-white" : "bg-gray-100 text-gray-900"}`}
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
              className={`p-2 rounded-b-md sm:rounded-r-md sm:rounded-b-none ${theme === "dark" ? "bg-blue-600 hover:bg-blue-700" : "bg-blue-500 hover:bg-blue-600"} text-white`}
            >
              <FaSearch />
            </button>
          </form>
        </div>

        {/* Feature Story */}
        {featureStory && (
          <div className="mb-16">
            <h2 className={`text-3xl font-semibold mb-6 ${theme === "dark" ? "text-white" : "text-gray-800"}`}>
              Featured Story
            </h2>
            <div className={`rounded-lg shadow-md overflow-hidden ${theme === "dark" ? "bg-gray-800" : "bg-[#90d2dc]"}`}>
              <MediaContent
                imageUrl={featureStory.imageUrl}
                videoUrl={featureStory.videoUrl}
                isYouTubeVideo={featureStory.isYouTubeVideo}
                title={featureStory.title}
              />
              <div className="p-6">
                <h3 className={`text-2xl font-semibold mb-4 ${theme === "dark" ? "text-white" : "text-gray-800"}`}>
                  {featureStory.title}
                </h3>
                <div className={`mb-4 ${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}>
                  {formatContent(featureStory.content.substring(0, 200) + "...")}
                </div>
                <div className="mb-4">
                  {featureStory.tags && featureStory.tags.length > 0 ? (
                    featureStory.tags.map(tag => (
                      <button
                        key={tag}
                        onClick={() => handleTagClick(tag)}
                        className={`inline-block px-2 py-1 rounded-full text-sm font-semibold mr-2 mb-2 cursor-pointer ${
                          theme === "dark" ? "bg-gray-700 text-gray-300 hover:bg-gray-600" : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                        }`}
                      >
                        {tag}
                      </button>
                    ))
                  ) : (
                    <p className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>No tags available</p>
                  )}
                </div>
                <Link
                  href={`/article/${featureStory.id}`}
                  className={`inline-block px-6 py-3 rounded-md ${
                    theme === "dark" ? "bg-green-600 hover:bg-green-700" : "bg-green-500 hover:bg-green-600"
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
            <h2 className={`text-3xl font-semibold mb-6 ${theme === "dark" ? "text-white" : "text-gray-800"}`}>
              Latest Impact Stories
            </h2>
            <div className="relative flex items-center">
              <button
                onClick={prevSlide}
                className="absolute left-0 z-10 -ml-4 sm:-ml-12 bg-white rounded-full p-2 focus:outline-none shadow-md"
              >
                <FaChevronLeft size={24} className="text-green-600" />
              </button>
              <div className="w-full">
                <AnimatePresence initial={false}>
                  <motion.div
                    key={currentSlide}
                    initial={{ opacity: 0, x: 300 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -300 }}
                    transition={{ duration: 0.5 }}
                    className={`rounded-lg shadow-md overflow-hidden ${theme === "dark" ? "bg-gray-800" : "bg-[#90d2dc]"}`}
                  >
                    {renderLatestImpactStories()}
                  </motion.div>
                </AnimatePresence>
              </div>
              <button
                onClick={nextSlide}
                className="absolute right-0 z-10 -mr-4 sm:-mr-12 bg-white rounded-full p-2 focus:outline-none shadow-md"
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