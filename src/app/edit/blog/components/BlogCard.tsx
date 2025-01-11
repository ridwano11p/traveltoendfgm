"use client";

import { BlogCardProps } from '../types';
import { FaEdit, FaTrash } from 'react-icons/fa';

export default function BlogCard({ blog, onEdit, onDelete, isDark }: BlogCardProps) {
  return (
    <div className={`p-6 rounded-lg shadow-md ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
      <h2 className={`text-2xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-800'}`}>
        {blog.title}
      </h2>
      <p className={`mb-2 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
        Author: {blog.author}
      </p>
      <p className={`mb-4 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
        {blog.content.substring(0, 150)}...
      </p>
      <div className="mb-4">
        {blog.tags?.map((tag, index) => (
          <span
            key={index}
            className={`inline-block px-2 py-1 rounded-full text-sm font-semibold mr-2 mb-2 ${
              isDark ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-700'
            }`}
          >
            {tag}
          </span>
        ))}
      </div>
      <div className="flex justify-end space-x-4">
        <button
          onClick={() => onEdit(blog)}
          className={`px-4 py-2 rounded-md ${
            isDark ? 'bg-green-600 hover:bg-green-700' : 'bg-green-500 hover:bg-green-600'
          } text-white transition duration-300 flex items-center`}
        >
          <FaEdit className="mr-2" /> Edit
        </button>
        <button
          onClick={() => onDelete(blog.id)}
          className={`px-4 py-2 rounded-md ${
            isDark ? 'bg-red-600 hover:bg-red-700' : 'bg-red-500 hover:bg-red-600'
          } text-white transition duration-300 flex items-center`}
        >
          <FaTrash className="mr-2" /> Delete
        </button>
      </div>
    </div>
  );
}