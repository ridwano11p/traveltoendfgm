"use client";

import { MediaPreviewProps } from '../types';
import { FaPlayCircle } from 'react-icons/fa';
import Image from 'next/image';

export default function MediaPreview({ post, isDark }: MediaPreviewProps) {
  const hasImage = post.imageUrl && post.imageUrl.trim() !== '';
  const hasVideo = post.videoUrl && post.videoUrl.trim() !== '';

  const renderMedia = (url: string, isVideo: boolean, isYouTube: boolean = false) => (
    <div className="relative w-full h-0 pb-[56.25%] bg-black overflow-hidden">
      {isVideo ? (
        <>
          {isYouTube ? (
            <Image
              src={`https://img.youtube.com/vi/${url.split('v=')[1]}/0.jpg`}
              alt={post.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          ) : (
            // Note: Next.js doesn't have a built-in video component, so we use the HTML video tag
            <video
              src={url}
              className="absolute inset-0 w-full h-full object-cover"
              preload="metadata"
            />
          )}
          <FaPlayCircle className="absolute inset-0 m-auto text-white text-5xl opacity-80" />
        </>
      ) : (
        <Image
          src={url}
          alt={post.title}
          fill
          className="object-contain"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      )}
    </div>
  );

  if (hasImage && hasVideo) {
    return (
      <div className="grid grid-cols-2 gap-2">
        {renderMedia(post.imageUrl!, false)}
        {renderMedia(post.videoUrl!, true, post.isYouTubeVideo)}
      </div>
    );
  }

  if (hasImage) {
    return renderMedia(post.imageUrl!, false);
  }

  if (hasVideo) {
    return renderMedia(post.videoUrl!, true, post.isYouTubeVideo);
  }

  return null;
}
