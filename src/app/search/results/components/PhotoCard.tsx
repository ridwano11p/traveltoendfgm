"use client";

import Image from "next/image";
import { FaExpand } from "react-icons/fa";

interface Photo {
  id: string;
  title: string;
  description?: string;
  photoUrl: string;
}

interface PhotoCardProps {
  photo: Photo;
  isDark: boolean;
  onClick: (photo: Photo) => void;
}

export default function PhotoCard({ photo, isDark, onClick }: PhotoCardProps) {
  return (
    <div
      className={`relative rounded-lg shadow-md overflow-hidden cursor-pointer ${
        isDark ? "bg-gray-800" : "bg-white"
      }`}
      onClick={() => onClick(photo)}
      role="button"
      aria-label={`View ${photo.title}`}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick(photo);
        }
      }}
    >
      <div className="aspect-w-16 aspect-h-9 relative">
        <Image
          src={photo.photoUrl}
          alt={photo.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300 bg-black bg-opacity-50">
          <FaExpand className="text-white text-3xl" aria-hidden="true" />
        </div>
      </div>

      <div className="p-4">
        <h3 className={`text-lg font-semibold ${
          isDark ? "text-white" : "text-gray-800"
        }`}>
          {photo.title}
        </h3>
        {photo.description && (
          <p className={`mt-2 text-sm ${
            isDark ? "text-gray-300" : "text-gray-600"
          }`}>
            {photo.description}
          </p>
        )}
      </div>
    </div>
  );
}