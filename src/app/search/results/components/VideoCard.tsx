"use client";

import MediaContent from "@/components/shared/MediaContent";

interface Video {
  id: string;
  title: string;
  description: string;
  videoUrl: string;
  isYouTube?: boolean;
  thumbnailUrl?: string;
}

interface VideoCardProps {
  video: Video;
  isDark: boolean;
}

export default function VideoCard({ video, isDark }: VideoCardProps) {
  return (
    <div 
      className={`rounded-lg shadow-md overflow-hidden ${
        isDark ? "bg-gray-800" : "bg-white"
      }`}
      role="article"
      aria-label={`Video: ${video.title}`}
    >
      <div className="p-4">
        <h3 className={`text-xl font-semibold mb-2 ${
          isDark ? "text-white" : "text-gray-800"
        }`}>
          {video.title}
        </h3>

        <div className="mb-4 aspect-video relative rounded-lg overflow-hidden">
          <MediaContent
            videoUrl={video.videoUrl}
            isYouTubeVideo={video.isYouTube}
            title={video.title}
            thumbnailUrl={video.thumbnailUrl}
          />
        </div>

        <p className={`text-sm ${
          isDark ? "text-gray-300" : "text-gray-600"
        }`}>
          {video.description}
        </p>
      </div>
    </div>
  );
}