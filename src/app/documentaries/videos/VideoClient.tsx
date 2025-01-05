"use client";

import { useState } from "react";
import { useTheme } from "@/context/ThemeContext";
import VideoCard from "./components/VideoCard";
import VideoModal from "./components/VideoModal";
import { Video } from "./types";

interface Props {
  videos: Video[];
}

export default function VideoClient({ videos }: Props) {
  const { theme } = useTheme();
  const [activeVideo, setActiveVideo] = useState<Video | null>(null);
  const isDark = theme === "dark";

  return (
    <div className={`min-h-screen py-12 ${isDark ? 'bg-gray-900' : 'bg-[#90d2dc]'}`}>
      <div className="max-w-6xl mx-auto px-4">
        <h1 className={`text-4xl font-bold mb-8 text-center ${isDark ? 'text-white' : 'text-gray-800'}`}>
          Documentaries
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {videos.map((video) => (
            <VideoCard
              key={video.id}
              video={video}
              isDark={isDark}
              onPlay={setActiveVideo}
            />
          ))}
        </div>
      </div>
      {activeVideo && (
        <VideoModal
          video={activeVideo}
          onClose={() => setActiveVideo(null)}
        />
      )}
    </div>
  );
}
