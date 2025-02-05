"use client";

import { ArticleHeaderProps } from '../types';
import { FaCalendar, FaUser, FaClock } from 'react-icons/fa';
import { motion } from 'framer-motion';

export default function ArticleHeader({
  title,
  author,
  date,
  tags,
  isDark
}: ArticleHeaderProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mb-8"
    >
      {/* Title */}
      <h1 className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight ${
        isDark ? 'text-white' : 'text-gray-900'
      }`}>
        {title}
      </h1>

      {/* Meta Information */}
      <div className="flex flex-wrap items-center gap-4 mb-6">
        {author && (
          <motion.div 
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className={`flex items-center px-3 py-1 rounded-full text-sm ${
              isDark 
                ? 'bg-gray-700/50 text-gray-300' 
                : 'bg-gray-100 text-gray-700'
            }`}
          >
            <FaUser className="mr-2 text-xs" />
            <span className="font-medium">{author}</span>
          </motion.div>
        )}
        
        {date && (
          <motion.div 
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            className={`flex items-center px-3 py-1 rounded-full text-sm ${
              isDark 
                ? 'bg-gray-700/50 text-gray-300' 
                : 'bg-gray-100 text-gray-700'
            }`}
          >
            <FaCalendar className="mr-2 text-xs" />
            <span>{date}</span>
          </motion.div>
        )}

        {/* Reading Time Estimate (example) */}
        <motion.div 
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
          className={`flex items-center px-3 py-1 rounded-full text-sm ${
            isDark 
              ? 'bg-gray-700/50 text-gray-300' 
              : 'bg-gray-100 text-gray-700'
          }`}
        >
          <FaClock className="mr-2 text-xs" />
          <span>5 min read</span>
        </motion.div>
      </div>

      {/* Tags */}
      {tags && tags.length > 0 && (
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex flex-wrap gap-2"
        >
          {tags.map(tag => (
            <span
              key={tag}
              className={`inline-flex items-center px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-300 ${
                isDark 
                  ? 'bg-green-600/90 text-white hover:bg-green-500' 
                  : 'bg-green-100 text-green-800 hover:bg-green-200'
              } cursor-pointer hover:shadow-md`}
            >
              #{tag}
            </span>
          ))}
        </motion.div>
      )}

      {/* Divider */}
      <div 
        className={`mt-8 h-px ${
          isDark ? 'bg-gray-700' : 'bg-gray-200'
        }`}
      />
    </motion.div>
  );
}
