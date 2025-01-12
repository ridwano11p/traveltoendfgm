"use client";

import Image from 'next/image';
import { MediaInputProps } from '../types';

export default function MediaInput({
  isLocalMedia,
  onLocalMediaToggle,
  onMediaFileChange,
  onYoutubeUrlChange,
  currentMedia,
  youtubeUrl,
  isDark
}: MediaInputProps) {
  return (
    <>
      <div className="flex items-center space-x-4">
        <label className={`flex items-center ${isDark ? 'text-white' : 'text-gray-700'}`}>
          <input
            type="radio"
            checked={isLocalMedia}
            onChange={() => onLocalMediaToggle(true)}
            className="mr-2"
          />
          Local Media
        </label>
        <label className={`flex items-center ${isDark ? 'text-white' : 'text-gray-700'}`}>
          <input
            type="radio"
            checked={!isLocalMedia}
            onChange={() => onLocalMediaToggle(false)}
            className="mr-2"
          />
          YouTube Video
        </label>
      </div>

      {isLocalMedia ? (
        <>
          <div>
            <label
              htmlFor="mediaFile"
              className={`block mb-2 ${isDark ? 'text-white' : 'text-gray-700'}`}
            >
              New Media File
            </label>
            <input
              type="file"
              id="mediaFile"
              onChange={(e) => onMediaFileChange(e.target.files ? e.target.files[0] : null)}
              accept="image/*,video/*"
              className={`w-full px-3 py-2 border rounded-md ${
                isDark
                  ? 'bg-gray-800 text-white border-gray-700'
                  : 'bg-white text-gray-900 border-gray-300'
              }`}
            />
          </div>
          {currentMedia && currentMedia.url && (
            <div className="mt-4">
              <label className={`block mb-2 ${isDark ? 'text-white' : 'text-gray-700'}`}>
                Current Media
              </label>
              {currentMedia.type === 'image' ? (
                <Image
                  src={currentMedia.url}
                  alt="Current Banner"
                  width={600}
                  height={400}
                  className="max-w-full h-auto rounded-md"
                />
              ) : (
                <video
                  src={currentMedia.url}
                  controls
                  className="max-w-full h-auto rounded-md"
                />
              )}
            </div>
          )}
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
            value={youtubeUrl}
            onChange={(e) => onYoutubeUrlChange(e.target.value)}
            placeholder="https://www.youtube.com/watch?v=..."
            className={`w-full px-3 py-2 border rounded-md ${
              isDark
                ? 'bg-gray-800 text-white border-gray-700'
                : 'bg-white text-gray-900 border-gray-300'
            }`}
          />
        </div>
      )}
    </>
  );
}