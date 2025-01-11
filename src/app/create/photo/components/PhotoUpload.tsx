"use client";

import { PhotoUploadProps } from '../types';

export default function PhotoUpload({ onFileChange, isDark }: PhotoUploadProps) {
  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onFileChange(file);
    }
  };

  return (
    <div>
      <label
        htmlFor="photo"
        className={`block mb-2 ${isDark ? 'text-white' : 'text-gray-700'}`}
      >
        Photo
      </label>
      <input
        type="file"
        id="photo"
        onChange={handlePhotoChange}
        accept="image/*"
        required
        className={`w-full px-3 py-2 border rounded-md ${
          isDark
            ? 'bg-gray-800 text-white border-gray-700'
            : 'bg-white text-gray-900 border-gray-300'
        }`}
      />
    </div>
  );
}
