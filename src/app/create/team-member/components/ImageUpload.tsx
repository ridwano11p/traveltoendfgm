"use client";

import { ImageUploadProps, MAX_IMAGE_SIZE } from '../types';
import imageCompression from 'browser-image-compression';

export default function ImageUpload({ onFileChange, isDark, error }: ImageUploadProps) {
  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > MAX_IMAGE_SIZE) {
        onFileChange(null);
        return;
      }

      try {
        const compressedFile = await imageCompression(file, {
          maxSizeMB: MAX_IMAGE_SIZE / (1024 * 1024),
          maxWidthOrHeight: 800
        });
        onFileChange(compressedFile);
      } catch (err) {
        console.error("Error compressing image: ", err);
        onFileChange(null);
      }
    }
  };

  return (
    <div>
      <label
        htmlFor="image"
        className={`block mb-2 ${isDark ? 'text-white' : 'text-gray-700'}`}
      >
        Profile Image
      </label>
      <input
        type="file"
        id="image"
        onChange={handleImageChange}
        accept="image/*"
        required
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
  );
}
