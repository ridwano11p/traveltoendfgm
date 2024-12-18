"use client";

import Image from "next/image";
import VideoPlayer from "./VideoPlayer";

interface MediaContentProps {
  imageUrl?: string;
  videoUrl?: string;
  isYouTubeVideo?: boolean;
  title: string;
}

export default function MediaContent({ 
  imageUrl, 
  videoUrl, 
  isYouTubeVideo = false, 
  title 
}: MediaContentProps) {
  const containerClasses = "w-full aspect-square md:aspect-video bg-black flex items-center justify-center overflow-hidden rounded-lg";
  
  if (imageUrl && videoUrl) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className={containerClasses}>
          <div className="relative w-full h-full">
            <Image
              src={imageUrl}
              alt={title}
              fill
              className="object-contain"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              priority
            />
          </div>
        </div>
        <div className={containerClasses}>
          <VideoPlayer
            videoUrl={videoUrl}
            isYouTubeVideo={isYouTubeVideo}
          />
        </div>
      </div>
    );
  }
  
  if (videoUrl) {
    return (
      <div className={containerClasses}>
        <VideoPlayer
          videoUrl={videoUrl}
          isYouTubeVideo={isYouTubeVideo}
        />
      </div>
    );
  }
  
  if (imageUrl) {
    return (
      <div className={containerClasses}>
        <div className="relative w-full h-full">
          <Image
            src={imageUrl}
            alt={title}
            fill
            className="object-contain"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority
          />
        </div>
      </div>
    );
  }
  
  return (
    <div className={`${containerClasses} bg-gray-100 dark:bg-gray-800`}>
      <p className="text-gray-500 dark:text-gray-400">No media available</p>
    </div>
  );
}