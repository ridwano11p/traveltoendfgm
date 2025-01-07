"use client";

import { VideoCardProps } from '../../types';
import MediaContent from './MediaContent';

export default function VideoCard({ video, isDark }: VideoCardProps) {
  return (
    <div className={`rounded-lg shadow-md overflow-hidden ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
      <div className="p-4">
        <h3 className={`text-xl font-semibold mb-2 ${isDark ? 'text-white' : 'text-gray-800'}`}>
          {video.title}
        </h3>
        <div className="mb-4">
          <MediaContent
            videoUrl={video.videoUrl}
            isYouTubeVideo={video.isYouTube}
            title={video.title}
          />
        </div>
        <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
          {video.description}
        </p>
      </div>
    </div>
  );
}
