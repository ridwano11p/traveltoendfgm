"use client";

import Image from "next/image";
import VideoPlayer from "./VideoPlayer";

interface MediaContentProps {
  imageUrl?: string;
  videoUrl?: string;
  isYouTubeVideo?: boolean;
  title: string;
  thumbnailUrl?: string;  // Added this prop
}

export default function MediaContent({
  imageUrl,
  videoUrl,
  isYouTubeVideo = false,
  title,
  thumbnailUrl
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
          {thumbnailUrl ? (
            <div className="relative w-full h-full">
              <Image
                src={thumbnailUrl}
                alt={`${title} thumbnail`}
                fill
                className="object-contain"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                priority
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <VideoPlayer
                  videoUrl={videoUrl}
                  isYouTubeVideo={isYouTubeVideo}
                />
              </div>
            </div>
          ) : (
            <VideoPlayer
              videoUrl={videoUrl}
              isYouTubeVideo={isYouTubeVideo}
            />
          )}
        </div>
      </div>
    );
  }

  if (videoUrl) {
    return (
      <div className={containerClasses}>
        {thumbnailUrl ? (
          <div className="relative w-full h-full">
            <Image
              src={thumbnailUrl}
              alt={`${title} thumbnail`}
              fill
              className="object-contain"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              priority
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <VideoPlayer
                videoUrl={videoUrl}
                isYouTubeVideo={isYouTubeVideo}
              />
            </div>
          </div>
        ) : (
          <VideoPlayer
            videoUrl={videoUrl}
            isYouTubeVideo={isYouTubeVideo}
          />
        )}
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
