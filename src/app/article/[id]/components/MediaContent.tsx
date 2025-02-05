"use client";

import { MediaContentProps } from '../types';
import VideoPlayer from '@/components/shared/VideoPlayer';
import Image from 'next/image';
import { motion } from 'framer-motion';

export default function MediaContent({
  imageUrl,
  videoUrl,
  isYouTubeVideo = false,
  title
}: MediaContentProps) {
  const containerClasses = "relative overflow-hidden rounded-lg shadow-lg";
  const mediaClasses = "object-cover transition-transform duration-500";

  if (imageUrl && videoUrl) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 p-4">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className={containerClasses}
        >
          <div className="aspect-[16/9]">
            <Image
              src={imageUrl}
              alt={title}
              fill
              className={`${mediaClasses} hover:scale-105`}
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
          </div>
        </motion.div>
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className={containerClasses}
        >
          <div className="aspect-[16/9]">
            <VideoPlayer
              videoUrl={videoUrl}
              isYouTubeVideo={Boolean(isYouTubeVideo)}
            />
          </div>
        </motion.div>
      </div>
    );
  }

  if (videoUrl) {
    return (
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className={containerClasses}
      >
        <div className="aspect-[16/9]">
          <VideoPlayer
            videoUrl={videoUrl}
            isYouTubeVideo={Boolean(isYouTubeVideo)}
          />
        </div>
      </motion.div>
    );
  }

  if (imageUrl) {
    return (
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className={containerClasses}
      >
        <div className="aspect-[16/9] md:aspect-[21/9]">
          <Image
            src={imageUrl}
            alt={title}
            fill
            className={`${mediaClasses} hover:scale-105`}
            sizes="100vw"
            priority
          />
        </div>
        <div 
          className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50 opacity-0 transition-opacity duration-300 hover:opacity-100"
          aria-hidden="true"
        />
      </motion.div>
    );
  }

  return null;
}
