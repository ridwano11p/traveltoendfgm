"use client";

import { VideoUploadProps } from '../types';

export default function VideoUpload({
  onVideoChange,
  onThumbnailChange,
  isDark
}: VideoUploadProps) {
  return (
    <>
      <div>
        <label
          htmlFor="videoFile"
          className={`block mb-2 ${isDark ? 'text-white' : 'text-gray-700'}`}
        >
          Upload Video File
        </label>
        <input
          type="file"
          id="videoFile"
          onChange={(e) => onVideoChange(e.target.files ? e.target.files[0] : null)}
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
          Thumbnail Image (Optional)
        </label>
        <input
          type="file"
          id="thumbnail"
          onChange={(e) => onThumbnailChange(e.target.files ? e.target.files[0] : null)}
          accept="image/*"
          className={`w-full px-3 py-2 border rounded-md ${
            isDark
              ? 'bg-gray-800 text-white border-gray-700'
              : 'bg-white text-gray-900 border-gray-300'
          }`}
        />
      </div>
    </>
  );
}
