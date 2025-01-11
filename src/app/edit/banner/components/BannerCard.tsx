"use client";

import { BannerCardProps } from '../types';
import { FaEdit, FaTrash, FaImage, FaVideo, FaYoutube } from 'react-icons/fa';

export default function BannerCard({
  banner,
  onEdit,
  onDelete,
  isDark
}: BannerCardProps) {
  return (
    <div className={`p-6 rounded-lg shadow-md ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
      <div className="relative mb-4">
        {banner.mediaType === 'image' ? (
          <img
            src={banner.mediaUrl}
            alt={banner.title}
            className="w-full h-48 object-cover rounded-md"
          />
        ) : banner.mediaType === 'video' ? (
          <video
            src={banner.mediaUrl}
            className="w-full h-48 object-cover rounded-md"
            controls
          />
        ) : (
          <iframe
            src={`https://www.youtube.com/embed/${banner.youtubeId}`}
            title={banner.title}
            className="w-full h-48 rounded-md"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        )}
        <div className="absolute top-2 right-2 bg-black bg-opacity-50 rounded-full p-2">
          {banner.mediaType === 'image' ? (
            <FaImage className="text-white" />
          ) : banner.mediaType === 'video' ? (
            <FaVideo className="text-white" />
          ) : (
            <FaYoutube className="text-white" />
          )}
        </div>
      </div>

      <h2 className={`text-2xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-800'}`}>
        {banner.title}
      </h2>
      <p className={`mb-4 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
        {banner.description}
      </p>

      <div className="flex justify-center space-x-4">
        <button
          onClick={() => onEdit(banner)}
          className={`px-4 py-2 rounded-md ${
            isDark ? 'bg-green-600 hover:bg-green-700' : 'bg-green-500 hover:bg-green-600'
          } text-white transition duration-300 flex items-center`}
        >
          <FaEdit className="mr-2" /> Edit
        </button>
        <button
          onClick={() => onDelete(banner.id)}
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