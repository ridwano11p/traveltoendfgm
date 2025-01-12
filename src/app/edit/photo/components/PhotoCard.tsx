"use client";

import { PhotoCardProps } from '../types';
import { FaEdit, FaTrash } from 'react-icons/fa';
import Image from 'next/image';

export default function PhotoCard({
  photo,
  onEdit,
  onDelete,
  isDark
}: PhotoCardProps) {
  return (
    <div className={`p-6 rounded-lg shadow-md ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
      <div className="relative w-full h-48 mb-4">
        <Image
          src={photo.photoUrl}
          alt={photo.title}
          fill
          className="object-cover rounded"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <h2 className={`text-xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-800'}`}>
        {photo.title}
      </h2>
      <p className={`mb-4 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
        {photo.description}
      </p>
      <div className="flex justify-end space-x-4">
        <button
          onClick={() => onEdit(photo)}
          className={`px-4 py-2 rounded-md ${
            isDark ? 'bg-green-600 hover:bg-green-700' : 'bg-green-500 hover:bg-green-600'
          } text-white transition duration-300 flex items-center`}
        >
          <FaEdit className="mr-2" /> Edit
        </button>
        <button
          onClick={() => onDelete(photo.id)}
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
