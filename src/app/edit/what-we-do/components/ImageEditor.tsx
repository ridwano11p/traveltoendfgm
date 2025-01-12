"use client";

import { ImageEditorProps, MAX_IMAGE_SIZE } from '../types';
import imageCompression from 'browser-image-compression';
import Image from 'next/image';

export default function ImageEditor({
  currentImageUrl,
  onImageChange,
  error,
  isDark
}: ImageEditorProps) {
  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > MAX_IMAGE_SIZE) {
        onImageChange(null);
        return;
      }

      try {
        const compressedFile = await imageCompression(file, {
          maxSizeMB: MAX_IMAGE_SIZE / (1024 * 1024),
          maxWidthOrHeight: 1920
        });
        onImageChange(compressedFile);
      } catch (err) {
        console.error("Error compressing image: ", err);
        onImageChange(null);
      }
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <label
          htmlFor="image"
          className={`block mb-2 ${isDark ? 'text-white' : 'text-gray-700'}`}
        >
          New Image
        </label>
        <input
          type="file"
          id="image"
          onChange={handleImageChange}
          accept="image/*"
          className={`w-full px-3 py-2 border rounded-md ${
            isDark
              ? 'bg-gray-800 text-white border-gray-700'
              : 'bg-white text-gray-900 border-gray-300'
          }`}
        />
        {error && (
          <p className={`mt-2 text-sm ${isDark ? 'text-red-400' : 'text-red-600'}`}>
            {error}
          </p>
        )}
      </div>

      {currentImageUrl && (
        <div>
          <p className={`mb-2 ${isDark ? 'text-white' : 'text-gray-700'}`}>
            Current Image:
          </p>
          <div className="relative w-full h-64">
            <Image
              src={currentImageUrl}
              alt="What We Do"
              fill
              className="rounded-md object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
        </div>
      )}
    </div>
  );
}
