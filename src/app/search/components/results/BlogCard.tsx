"use client";

import { BlogCardProps } from '../../types';
import { motion } from 'framer-motion';
import Link from 'next/link';
import MediaContent from './MediaContent';

export default function BlogCard({ blog, isDark, onTagClick }: BlogCardProps) {
  const truncateContent = (content: string, maxLength = 150) => {
    if (content.length <= maxLength) return content;
    return content.substr(0, content.lastIndexOf(' ', maxLength)) + '...';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`mb-12 rounded-lg shadow-lg overflow-hidden ${isDark ? 'bg-gray-800' : 'bg-white'}`}
    >
      <div className="p-6">
        <h2 className={`text-2xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-800'}`}>
          {blog.title}
        </h2>
        <p className={`text-sm mb-2 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
          By {blog.author}
        </p>
        <p className={`text-sm mb-4 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
          {blog.date}
        </p>

        <div className="mb-4">
          <MediaContent
            imageUrl={blog.imageUrl}
            videoUrl={blog.videoUrl}
            isYouTubeVideo={blog.isYouTubeVideo}
            title={blog.title}
          />
        </div>

        <div className={`mb-4 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
          <p>{truncateContent(blog.content)}</p>
        </div>

        <div className="mb-4">
          {blog.tags?.map(tag => (
            <button
              key={tag}
              onClick={() => onTagClick(tag)}
              className={`inline-block px-2 py-1 rounded-full text-sm font-semibold mr-2 mb-2 cursor-pointer ${
                isDark ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>

        <div className="flex justify-center">
          <Link
            href={`/article/${blog.id}`}
            className={`px-4 py-2 rounded ${
              isDark ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'
            } text-white transition duration-300`}
          >
            Read More
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
