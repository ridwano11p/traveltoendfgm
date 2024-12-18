"use client";

import Image from 'next/image';
import VideoPlayer from './VideoPlayer';

interface MediaContentProps {
  imageUrl?: string;
  videoUrl?: string;
  mediaUrl?: string;
  mediaType?: 'image' | 'video';
  isYouTubeVideo?: boolean;
  title?: string;
}

const MediaContent = ({ 
  imageUrl, 
  videoUrl, 
  mediaUrl, 
  mediaType, 
  isYouTubeVideo = false, 
  title = 'Media content'
}: MediaContentProps) => {
  const containerClasses = "w-full aspect-square md:aspect-video bg-black flex items-center justify-center overflow-hidden";
  const mediaClasses = "w-full h-full object-contain";

  // Handle combined media display (image and video)
  if (imageUrl && videoUrl) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className={containerClasses}>
          <Image
            src={imageUrl}
            alt={title}
            className={mediaClasses}
            width={800}
            height={600}
          />
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

  // Handle single video
  if (videoUrl || (mediaType === 'video' && mediaUrl)) {
    return (
      <div className={containerClasses}>
        <VideoPlayer
          videoUrl={videoUrl || mediaUrl || ''}
          isYouTubeVideo={isYouTubeVideo}
        />
      </div>
    );
  }

  // Handle single image
  if (imageUrl || (mediaType === 'image' && mediaUrl)) {
    return (
      <div className={containerClasses}>
        <Image
          src={imageUrl || mediaUrl || ''}
          alt={title}
          className={mediaClasses}
          width={800}
          height={600}
          priority
        />
      </div>
    );
  }

  return null;
};

export default MediaContent;