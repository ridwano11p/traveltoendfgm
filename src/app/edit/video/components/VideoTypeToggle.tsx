"use client";

import { VideoTypeToggleProps } from '../types';

export default function VideoTypeToggle({
  isLocalVideo,
  onChange,
  isDark
}: VideoTypeToggleProps) {
  return (
    <div className="flex items-center space-x-4">
      <label className={`flex items-center ${isDark ? 'text-white' : 'text-gray-700'}`}>
        <input
          type="radio"
          checked={isLocalVideo}
          onChange={() => onChange(true)}
          className="mr-2"
        />
        Local Video
      </label>
      <label className={`flex items-center ${isDark ? 'text-white' : 'text-gray-700'}`}>
        <input
          type="radio"
          checked={!isLocalVideo}
          onChange={() => onChange(false)}
          className="mr-2"
        />
        YouTube Video
      </label>
    </div>
  );
}
