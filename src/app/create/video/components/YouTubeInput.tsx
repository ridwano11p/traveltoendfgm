"use client";

import { YouTubeInputProps } from '../types';

export default function YouTubeInput({ value, onChange, isDark }: YouTubeInputProps) {
  return (
    <div>
      <label
        htmlFor="youtubeUrl"
        className={`block mb-2 ${isDark ? 'text-white' : 'text-gray-700'}`}
      >
        YouTube Video URL
      </label>
      <input
        type="url"
        id="youtubeUrl"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="https://www.youtube.com/watch?v=..."
        className={`w-full px-3 py-2 border rounded-md ${
          isDark
            ? 'bg-gray-800 text-white border-gray-700'
            : 'bg-white text-gray-900 border-gray-300'
        }`}
      />
    </div>
  );
}
