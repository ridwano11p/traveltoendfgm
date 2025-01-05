"use client";

import { FaPlay } from "react-icons/fa";
import Image from "next/image";
import { Video } from "../types";

interface Props {
  video: Video;
  isDark: boolean;
  onPlay: (video: Video) => void;
}

export default function VideoCard({ video, isDark, onPlay }: Props) {
  const thumbnailUrl = video.isYouTube
    ? `https://img.youtube.com/vi/${video.youtubeId}/0.jpg`
    : (video.thumbnailUrl || video.videoUrl);

  // Add error handling for thumbnail
  if (!thumbnailUrl) {
    return null;
  }

  return (
    <div className={`rounded-lg shadow-md overflow-hidden transition-transform duration-300 transform hover:scale-105 ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
      <div className="relative h-48">
        <Image
          src={thumbnailUrl}
          alt={video.title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <button
          onClick={() => onPlay(video)}
          className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 hover:bg-opacity-75 transition duration-300"
        >
          <FaPlay className="text-white text-4xl" />
        </button>
      </div>
      <div className="p-4">
        <h3 className={`text-xl font-semibold mb-2 ${isDark ? 'text-white' : 'text-gray-800'}`}>
          {video.title}
        </h3>
        <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
          {video.description}
        </p>
      </div>
    </div>
  );
}
