"use client";

import { ArticleHeaderProps } from '../types';
import { FaCalendar, FaUser } from 'react-icons/fa';

export default function ArticleHeader({
  title,
  author,
  date,
  tags,
  isDark
}: ArticleHeaderProps) {
  return (
    <div className="mb-6">
      <h1 className="text-3xl md:text-4xl font-bold mb-4">
        {title}
      </h1>
      <div className="flex flex-wrap items-center text-sm mb-6">
        {author && (
          <div className="flex items-center mr-6 mb-2">
            <FaUser className="mr-2" />
            <span>{author}</span>
          </div>
        )}
        {date && (
          <div className="flex items-center mb-2">
            <FaCalendar className="mr-2" />
            <span>{date}</span>
          </div>
        )}
      </div>
      {tags && tags.length > 0 && (
        <div className="mb-6">
          {tags.map(tag => (
            <span
              key={tag}
              className={`inline-block px-3 py-1 rounded-full text-sm font-semibold mr-2 mb-2 ${
                isDark ? 'bg-blue-600 text-white' : 'bg-blue-100 text-blue-800'
              }`}
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
