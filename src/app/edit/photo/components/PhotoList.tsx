"use client";

import { PhotoListProps } from '../types';
import PhotoCard from './PhotoCard';

export default function PhotoList({
  photos,
  onEdit,
  onDelete,
  isDark
}: PhotoListProps) {
  if (photos.length === 0) {
    return (
      <div className={`text-center mt-8 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
        No photos created
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {photos.map((photo) => (
        <PhotoCard
          key={photo.id}
          photo={photo}
          onEdit={onEdit}
          onDelete={onDelete}
          isDark={isDark}
        />
      ))}
    </div>
  );
}
