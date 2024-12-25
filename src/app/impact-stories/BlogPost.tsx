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
  const containerClasses = "w-full aspect-square md:aspect-video bg-black flex items-center justify-center overflow-hidden relative";
  const mediaClasses = "w-full h-full object-contain";

  if (imageUrl && videoUrl) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className={containerClasses}>
          <Image
            src={imageUrl}
            alt={title}
            fill
            className={mediaClasses}
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
        <div className={containerClasses}>
          <VideoPlayer
            videoUrl={videoUrl}
            isYouTubeVideo={isYouTubeVideo || false}
          />
        </div>
      </div>
    );
  } else if (videoUrl) {
    return (
      <div className={containerClasses}>
        <VideoPlayer
          videoUrl={videoUrl}
          isYouTubeVideo={isYouTubeVideo || false}
        />
      </div>
    );
  } else if (imageUrl) {
    return (
      <div className={containerClasses}>
        <Image
          src={imageUrl}
          alt={title}
          fill
          className={mediaClasses}
          sizes="100vw"
          priority
        />
      </div>
    );
  }
  return null;
};

const truncateContent = (content: string, maxLength = 150) => {
  if (content.length <= maxLength) return content;
  return content.substr(0, content.lastIndexOf(" ", maxLength)) + "...";
};

export default function BlogPost({ post, isDark, onTagClick }: BlogPostProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`mb-12 rounded-lg shadow-lg overflow-hidden ${isDark ? "bg-gray-800" : "bg-[#90d2dc]"} max-w-4xl mx-auto`}
    >
      <div className="p-6">
        <h2 className={`text-2xl font-bold mb-2 text-center ${isDark ? "text-white" : "text-gray-800"}`}>
          {post.title}
        </h2>
        
        {post.author && (
          <p className={`text-sm mb-2 text-center ${isDark ? "text-gray-300" : "text-gray-600"}`}>
            By {post.author}
          </p>
        )}
        
        {post.date && (
          <p className={`text-sm mb-4 text-center ${isDark ? "text-gray-400" : "text-gray-500"}`}>
            {post.date}
          </p>
        )}

        <div className="mb-4">
          <MediaContent
            imageUrl={post.imageUrl}
            videoUrl={post.videoUrl}
            isYouTubeVideo={post.isYouTubeVideo}
            title={post.title}
          />
        </div>

        <div className={`mb-4 ${isDark ? "text-gray-300" : "text-gray-700"}`}>
          <p>{truncateContent(post.content)}</p>
        </div>

        <div className="mb-4">
          {post.tags && post.tags.map(tag => (
            <button
              key={tag}
              onClick={() => onTagClick(tag)}
              className={`inline-block px-2 py-1 rounded-full text-sm font-semibold mr-2 mb-2 cursor-pointer ${
                isDark ? "bg-gray-700 text-gray-300 hover:bg-gray-600" : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              } transition duration-300`}
            >
              {tag}
            </button>
          ))}
        </div>

        <div className="flex justify-center">
          <Link
            href={`/article/${post.id}`}
            className={`px-4 py-2 rounded ${
              isDark ? "bg-blue-600 hover:bg-blue-700" : "bg-blue-500 hover:bg-blue-600"
            } text-white transition duration-300`}
          >
            Read More
          </Link>
        </div>
      </div>
    </motion.div>
  );
}