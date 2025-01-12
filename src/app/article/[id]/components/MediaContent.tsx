"use client";

import { MediaContentProps } from '../types';
import VideoPlayer from '@/components/shared/VideoPlayer';
import Image from 'next/image';

export default function MediaContent({
  imageUrl,
  videoUrl,
  isYouTubeVideo = false, // Set default value
  title
}: MediaContentProps) {
  const containerClasses = "w-full aspect-square md:aspect-video bg-black flex items-center justify-center overflow-hidden relative";
  const mediaClasses = "object-contain";

  if (imageUrl && videoUrl) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className={containerClasses}>
          <Image
            src={imageUrl}
            alt={title}
            fill
            className={mediaClasses}
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
        <div className={containerClasses}>
          <VideoPlayer
            videoUrl={videoUrl}
            isYouTubeVideo={Boolean(isYouTubeVideo)} // Convert to boolean
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
          isYouTubeVideo={Boolean(isYouTubeVideo)} // Convert to boolean
        />
      </div>
    );
  }

  if (imageUrl) {
    return (
      <div className={containerClasses}>
        <Image
          src={imageUrl}
          alt={title}
          fill
          className={mediaClasses}
          sizes="100vw"
          priority
        />
      </div>
    );
  }

  return null;
}
