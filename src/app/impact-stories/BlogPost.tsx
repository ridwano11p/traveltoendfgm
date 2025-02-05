"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import VideoPlayer from "@/components/shared/VideoPlayer";

interface BlogPostProps {
  post: {
    id: string;
    title: string;
    content: string;
    author?: string;
    date?: string;
    imageUrl?: string;
    videoUrl?: string;
    isYouTubeVideo?: boolean;
    tags?: string[];
  };
  isDark: boolean;
  onTagClick: (tag: string) => void;
}

interface MediaContentProps {
  imageUrl?: string;
  videoUrl?: string;
  isYouTubeVideo?: boolean;
  title: string;
}

const MediaContent = ({ imageUrl, videoUrl, isYouTubeVideo = false, title }: MediaContentProps) => {
  const containerClasses = "relative overflow-hidden rounded-lg shadow-lg";
  const mediaClasses = "object-cover transition-transform duration-500";

  if (imageUrl && videoUrl) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 p-4">
        <div className={containerClasses}>
          <div className="aspect-[16/9]">
            <Image
              src={imageUrl}
              alt={title}
              fill
              className={`${mediaClasses} hover:scale-105`}
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </div>
        <div className={containerClasses}>
          <div className="aspect-[16/9]">
            <VideoPlayer
              videoUrl={videoUrl}
              isYouTubeVideo={Boolean(isYouTubeVideo)}
            />
          </div>
        </div>
      </div>
    );
  }

  if (videoUrl) {
    return (
      <div className={containerClasses}>
        <div className="aspect-[16/9]">
          <VideoPlayer
            videoUrl={videoUrl}
            isYouTubeVideo={Boolean(isYouTubeVideo)}
          />
        </div>
      </div>
    );
  }

  if (imageUrl) {
    return (
      <div className={containerClasses}>
        <div className="aspect-[16/9]">
          <Image
            src={imageUrl}
            alt={title}
            fill
            className={`${mediaClasses} hover:scale-105`}
            sizes="100vw"
            priority
          />
        </div>
      </div>
    );
  }

  return null;
};

const truncateContent = (content: string, maxLength = 200) => {
  if (content.length <= maxLength) return content;
  return content.substr(0, content.lastIndexOf(" ", maxLength)) + "...";
};

export default function BlogPost({ post, isDark, onTagClick }: BlogPostProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`mb-8 md:mb-12 overflow-hidden rounded-xl shadow-lg ${
        isDark 
          ? 'bg-gray-800/90' 
          : 'bg-[#90d2dc]/90'
      } backdrop-blur-sm transition-all duration-300 hover:shadow-xl transform hover:-translate-y-1`}
    >
      {/* Desktop Layout */}
      <div className="hidden md:block">
        <div className="grid lg:grid-cols-2 gap-6">
          <div className="lg:order-2">
            <div className="p-6 lg:p-8">
              <div className="flex flex-col h-full">
                <div>
                  <h2 className={`text-2xl lg:text-3xl font-bold mb-3 ${
                    isDark ? "text-white" : "text-gray-800"
                  }`}>
                    {post.title}
                  </h2>
                  
                  <div className="flex items-center gap-4 mb-4">
                    {post.author && (
                      <p className={`text-sm ${isDark ? "text-gray-300" : "text-gray-600"}`}>
                        By {post.author}
                      </p>
                    )}
                    {post.date && (
                      <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-500"}`}>
                        {post.date}
                      </p>
                    )}
                  </div>

                  <div className={`mb-6 ${isDark ? "text-gray-300" : "text-gray-700"}`}>
                    <p className="text-base leading-relaxed">{truncateContent(post.content)}</p>
                  </div>
                </div>

                <div className="mt-auto">
                  <div className="mb-6 flex flex-wrap gap-2">
                    {post.tags?.map(tag => (
                      <button
                        key={tag}
                        onClick={() => onTagClick(tag)}
                        className={`px-3 py-1 rounded-full text-sm font-medium transition-all duration-300 ${
                          isDark 
                            ? "bg-gray-700/80 text-gray-300 hover:bg-gray-600" 
                            : "bg-[#82c4ce]/80 text-gray-700 hover:bg-[#82c4ce]"
                        } hover:shadow-md`}
                      >
                        {tag}
                      </button>
                    ))}
                  </div>

                  <Link
                    href={`/article/${post.id}`}
                    className={`inline-flex items-center px-6 py-3 rounded-lg font-medium ${
                      isDark 
                        ? "bg-green-600 hover:bg-green-700" 
                        : "bg-green-500 hover:bg-green-600"
                    } text-white transition-all duration-300 hover:shadow-lg transform hover:scale-105`}
                  >
                    Read Full Story
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:order-1">
            <div className="h-full">
              <MediaContent
                imageUrl={post.imageUrl}
                videoUrl={post.videoUrl}
                isYouTubeVideo={post.isYouTubeVideo}
                title={post.title}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="md:hidden">
        <div className="relative">
          <MediaContent
            imageUrl={post.imageUrl}
            videoUrl={post.videoUrl}
            isYouTubeVideo={post.isYouTubeVideo}
            title={post.title}
          />
        </div>

        <div className="p-4">
          <h2 className={`text-xl font-bold mb-2 ${
            isDark ? "text-white" : "text-gray-800"
          }`}>
            {post.title}
          </h2>

          <div className="flex items-center gap-3 mb-3 text-xs">
            {post.author && (
              <p className={isDark ? "text-gray-300" : "text-gray-600"}>
                By {post.author}
              </p>
            )}
            {post.date && (
              <p className={isDark ? "text-gray-400" : "text-gray-500"}>
                {post.date}
              </p>
            )}
          </div>

          <div className={`mb-4 ${isDark ? "text-gray-300" : "text-gray-700"}`}>
            <p className="text-sm leading-relaxed">{truncateContent(post.content, 150)}</p>
          </div>

          <div className="mb-4 flex flex-wrap gap-2">
            {post.tags?.map(tag => (
              <button
                key={tag}
                onClick={() => onTagClick(tag)}
                className={`px-2 py-1 rounded-full text-xs font-medium transition-all duration-300 ${
                  isDark 
                    ? "bg-gray-700/80 text-gray-300 hover:bg-gray-600" 
                    : "bg-[#82c4ce]/80 text-gray-700 hover:bg-[#82c4ce]"
                }`}
              >
                {tag}
              </button>
            ))}
          </div>

          <Link
            href={`/article/${post.id}`}
            className={`block w-full text-center px-4 py-2 rounded-lg text-sm font-medium ${
              isDark 
                ? "bg-green-600 hover:bg-green-700" 
                : "bg-green-500 hover:bg-green-600"
            } text-white transition-all duration-300 active:scale-95`}
          >
            Read Full Story
          </Link>
        </div>
      </div>
    </motion.article>
  );
}