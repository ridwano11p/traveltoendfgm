"use client";

import { FaExpand } from 'react-icons/fa';
import Image from 'next/image';
import { Photo } from '../types';

interface Props {
  photo: Photo;
  isDark: boolean;
  onClick: (photo: Photo) => void;
}

export default function PhotoCard({ photo, isDark, onClick }: Props) {
  return (
    <div
      className={`relative rounded-lg shadow-md overflow-hidden cursor-pointer ${
        isDark ? 'bg-gray-800' : 'bg-white'
      }`}
      onClick={() => onClick(photo)}
    >
      <div className="relative w-full h-40 sm:h-48"> {/* Adjusted height for mobile */}
        <Image
          src={photo.photoUrl}
          alt={photo.title}
          fill
          className="object-cover"
          sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
          priority
        />
        <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300 bg-black bg-opacity-50">
          <FaExpand className="text-white text-2xl sm:text-3xl" />
        </div>
      </div>
      <div className="p-3 sm:p-4">
        <h3 className={`text-base sm:text-lg font-semibold ${
          isDark ? 'text-white' : 'text-gray-800'
        }`}>
          {photo.title}
        </h3>
      </div>
    </div>
  );
}
