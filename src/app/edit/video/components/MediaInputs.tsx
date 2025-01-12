"use client";

import { MediaInputsProps } from '../types';

export default function MediaInputs({
  isLocalVideo,
  tempYoutubeUrl,
  onVideoChange,
  onThumbnailChange,
  onYoutubeUrlChange,
  isDark
}: MediaInputsProps) {
  return isLocalVideo ? (
    <>
      <div>
        <label
          htmlFor="video"
          className={`block mb-2 ${isDark ? 'text-white' : 'text-gray-700'}`}
        >
          New Video File
        </label>
        <input
          type="file"
          id="video"
          onChange={(e) => onVideoChange(e.target.files?.[0] || null)}
          accept="video/*"
          className={`w-full px-3 py-2 border rounded-md ${
            isDark
              ? 'bg-gray-800 text-white border-gray-700'
              : 'bg-white text-gray-900 border-gray-300'
          }`}
        />
      </div>
      <div>
        <label
          htmlFor="thumbnail"
          className={`block mb-2 ${isDark ? 'text-white' : 'text-gray-700'}`}
        >
          New Thumbnail
        </label>
        <input
          type="file"
          id="thumbnail"
          onChange={(e) => onThumbnailChange(e.target.files?.[0] || null)}
          accept="image/*"
          className={`w-full px-3 py-2 border rounded-md ${
            isDark
              ? 'bg-gray-800 text-white border-gray-700'
              : 'bg-white text-gray-900 border-gray-300'
          }`}
        />
      </div>
    </>
  ) : (
    <div>
      <label
        htmlFor="youtubeUrl"
        className={`block mb-2 ${isDark ? 'text-white' : 'text-gray-700'}`}
      >
        YouTube URL
      </label>
      <input
        type="url"
        id="youtubeUrl"
        value={tempYoutubeUrl}
        onChange={(e) => onYoutubeUrlChange(e.target.value)}
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
