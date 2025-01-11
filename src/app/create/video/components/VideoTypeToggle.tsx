"use client";

import { VideoTypeToggleProps } from '../types';

export default function VideoTypeToggle({
  isLocalVideo,
  onToggle,
  isDark
}: VideoTypeToggleProps) {
  return (
    <div className="flex items-center space-x-4">
      <label className={`flex items-center ${isDark ? 'text-white' : 'text-gray-700'}`}>
        <input
          type="radio"
          checked={isLocalVideo}
          onChange={() => onToggle(true)}
          className="mr-2"
        />
        Upload Local Video
      </label>
      <label className={`flex items-center ${isDark ? 'text-white' : 'text-gray-700'}`}>
        <input
          type="radio"
          checked={!isLocalVideo}
          onChange={() => onToggle(false)}
          className="mr-2"
        />
        Add YouTube Video
      </label>
    </div>
  );
}
