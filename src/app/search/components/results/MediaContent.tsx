"use client";

import { MediaContentProps } from '../../types';
import Image from 'next/image';
import VideoPlayer from '@/components/shared/VideoPlayer';

export default function MediaContent({ imageUrl, videoUrl, isYouTubeVideo, title }: MediaContentProps) {
  const containerClasses = "w-full aspect-square md:aspect-video bg-black flex items-center justify-center overflow-hidden relative";

  if (imageUrl && videoUrl) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className={containerClasses}>
          <Image
            src={imageUrl}
            alt={title}
            fill
            className="object-contain"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
        <div className={containerClasses}>
          <VideoPlayer
            videoUrl={videoUrl}
            isYouTubeVideo={Boolean(isYouTubeVideo)}
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
          isYouTubeVideo={Boolean(isYouTubeVideo)}
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
          className="object-contain"
          sizes="100vw"
        />
      </div>
    );
  }

  return null;
}
