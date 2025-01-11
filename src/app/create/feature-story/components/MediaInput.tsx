"use client";

import { MediaInputProps } from '../types';

export default function MediaInput({
  isYouTubeVideo,
  youTubeUrl,
  onYouTubeChange,
  onVideoChange,
  onImageChange,
  onToggleYouTube,
  isDark
}: MediaInputProps) {
  return (
    <>
      <div>
        <label
          htmlFor="image"
          className={`block mb-2 ${isDark ? 'text-white' : 'text-gray-700'}`}
        >
          Image
        </label>
        <input
          type="file"
          id="image"
          onChange={(e) => onImageChange(e.target.files ? e.target.files[0] : null)}
          accept="image/*"
          className={`w-full px-3 py-2 border rounded-md ${
            isDark
              ? 'bg-gray-800 text-white border-gray-700'
              : 'bg-white text-gray-900 border-gray-300'
          }`}
        />
      </div>
      <div>
        <label className={`flex items-center mb-2 ${isDark ? 'text-white' : 'text-gray-700'}`}>
          <input
            type="checkbox"
            checked={isYouTubeVideo}
            onChange={onToggleYouTube}
            className="mr-2"
          />
          YouTube Video
        </label>
        {isYouTubeVideo ? (
          <input
            type="url"
            value={youTubeUrl}
            onChange={(e) => onYouTubeChange(e.target.value)}
            placeholder="Enter YouTube URL"
            className={`w-full px-3 py-2 border rounded-md ${
              isDark
                ? 'bg-gray-800 text-white border-gray-700'
                : 'bg-white text-gray-900 border-gray-300'
            }`}
          />
        ) : (
          <input
            type="file"
            onChange={(e) => onVideoChange(e.target.files ? e.target.files[0] : null)}
            accept="video/*"
            className={`w-full px-3 py-2 border rounded-md ${
              isDark
                ? 'bg-gray-800 text-white border-gray-700'
                : 'bg-white text-gray-900 border-gray-300'
            }`}
          />
        )}
      </div>
    </>
  );
}
