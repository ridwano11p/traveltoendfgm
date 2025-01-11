"use client";

import { TagSectionProps } from '../types';
import { FaTimes } from 'react-icons/fa';

export default function TagSection({
  tags,
  newTag,
  onAddTag,
  onRemoveTag,
  onNewTagChange,
  isDark
}: TagSectionProps) {
  return (
    <div>
      <label
        htmlFor="tags"
        className={`block mb-2 ${isDark ? 'text-white' : 'text-gray-700'}`}
      >
        Tags
      </label>
      <div className="flex flex-wrap mb-2">
        {tags.map((tag, index) => (
          <span
            key={index}
            className={`${
              isDark ? 'bg-blue-600 text-white' : 'bg-blue-100 text-blue-800'
            } px-2 py-1 rounded-full text-sm font-semibold mr-2 mb-2 flex items-center`}
          >
            {tag}
            <button
              type="button"
              onClick={() => onRemoveTag(tag)}
              className="ml-1 focus:outline-none"
            >
              <FaTimes className="h-3 w-3" />
            </button>
          </span>
        ))}
      </div>
      <div className="flex">
        <input
          type="text"
          value={newTag}
          onChange={(e) => onNewTagChange(e.target.value)}
          placeholder="Add a tag"
          className={`flex-grow px-3 py-2 border rounded-l-md ${
            isDark
              ? 'bg-gray-800 text-white border-gray-700'
              : 'bg-white text-gray-900 border-gray-300'
          }`}
        />
        <button
          type="button"
          onClick={onAddTag}
          className={`px-4 py-2 rounded-r-md ${
            isDark
              ? 'bg-blue-600 hover:bg-blue-700'
              : 'bg-blue-500 hover:bg-blue-600'
          } text-white`}
        >
          Add Tag
        </button>
      </div>
    </div>
  );
}