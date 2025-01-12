"use client";

import { VideoCardProps } from '../types';
import { FaEdit, FaTrash, FaPlay, FaYoutube } from 'react-icons/fa';
import Image from 'next/image';

export default function VideoCard({
  video,
  isDark,
  onEdit,
  onDelete
}: VideoCardProps) {
  const thumbnailUrl = video.isYouTube
    ? `https://img.youtube.com/vi/${video.youtubeId}/0.jpg`
    : (video.thumbnailUrl || video.videoUrl);

  return (
    <div className={`p-6 rounded-lg shadow-md ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
      <div className="relative w-full h-48">
        <Image
          src={thumbnailUrl || ''}
          alt={video.title}
          fill
          className="object-cover rounded-md"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          {video.isYouTube ? (
            <FaYoutube className="text-white text-4xl" />
          ) : (
            <FaPlay className="text-white text-4xl" />
          )}
        </div>
      </div>
      <h2 className={`text-2xl font-bold mb-2 mt-4 ${isDark ? 'text-white' : 'text-gray-800'}`}>
        {video.title}
      </h2>
      <p className={`mb-4 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
        {video.description}
      </p>
      <div className="flex justify-center space-x-4">
        <button
          onClick={() => onEdit(video)}
          className={`px-4 py-2 rounded-md ${
            isDark ? 'bg-green-600 hover:bg-green-700' : 'bg-green-500 hover:bg-green-600'
          } text-white transition duration-300 flex items-center`}
        >
          <FaEdit className="mr-2" /> Edit
        </button>
        <button
          onClick={() => onDelete(video.id)}
          className={`px-4 py-2 rounded-md ${
            isDark ? 'bg-red-600 hover:bg-red-700' : 'bg-red-500 hover:bg-red-600'
          } text-white transition duration-300 flex items-center`}
        >
          <FaTrash className="mr-2" /> Delete
        </button>
      </div>
    </div>
  );
}
