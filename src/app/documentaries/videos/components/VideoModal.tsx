"use client";

import { useEffect } from "react";
import { FaTimes } from "react-icons/fa";
import YouTubeEmbed from "./YouTubeEmbed";
import { Video } from "../types";

interface Props {
  video: Video;
  onClose: () => void;
}

export default function VideoModal({ video, onClose }: Props) {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-white bg-black bg-opacity-50 hover:bg-opacity-75 rounded-full p-2 transition duration-300 z-10"
        aria-label="Close"
      >
        <FaTimes size={24} />
      </button>
      <div className="w-full max-w-4xl">
        <div className="w-full md:w-3/4 mx-auto">
          {video.isYouTube && video.youtubeId ? (
            <YouTubeEmbed videoId={video.youtubeId} />
          ) : (
            video.videoUrl && <video src={video.videoUrl} controls className="w-full" />
          )}
        </div>
      </div>
    </div>
  );
}
