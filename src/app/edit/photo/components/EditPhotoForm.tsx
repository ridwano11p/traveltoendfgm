"use client";

import { EditPhotoFormProps } from '../types';
import Image from 'next/image';

export default function EditPhotoForm({
  photo,
  onUpdate,
  onCancel,
  onImageChange,
  onRemoveImage,
  removedImage,
  isDark
}: EditPhotoFormProps) {
  return (
    <form onSubmit={onUpdate} className="space-y-6">
      <div>
        <label
          htmlFor="title"
          className={`block mb-2 ${isDark ? 'text-white' : 'text-gray-700'}`}
        >
          Title
        </label>
        <input
          type="text"
          id="title"
          value={photo.title}
          onChange={(e) => photo.title = e.target.value}
          required
          minLength={3}
          className={`w-full px-3 py-2 border rounded-md ${
            isDark
              ? 'bg-gray-800 text-white border-gray-700'
              : 'bg-white text-gray-900 border-gray-300'
          }`}
        />
      </div>

      <div>
        <label
          htmlFor="description"
          className={`block mb-2 ${isDark ? 'text-white' : 'text-gray-700'}`}
        >
          Description
        </label>
        <textarea
          id="description"
          value={photo.description}
          onChange={(e) => photo.description = e.target.value}
          rows={4}
          className={`w-full px-3 py-2 border rounded-md ${
            isDark
              ? 'bg-gray-800 text-white border-gray-700'
              : 'bg-white text-gray-900 border-gray-300'
          }`}
        />
      </div>

      <div>
        <label
          htmlFor="image"
          className={`block mb-2 ${isDark ? 'text-white' : 'text-gray-700'}`}
        >
          Image
        </label>
        {photo.tempPhotoUrl && !removedImage && (
          <div className="mb-2">
            <div className="relative w-32 h-32">
              <Image
                src={photo.tempPhotoUrl}
                alt={photo.title}
                fill
                className="object-cover rounded"
                sizes="128px"
              />
            </div>
            <button
              type="button"
              onClick={onRemoveImage}
              className={`mt-2 px-2 py-1 rounded ${
                isDark ? 'bg-red-600 hover:bg-red-700' : 'bg-red-500 hover:bg-red-600'
              } text-white transition duration-300`}
            >
              Remove Image
            </button>
          </div>
        )}
        <input
          type="file"
          id="image"
          onChange={onImageChange}
          accept="image/*"
          className={`w-full px-3 py-2 border rounded-md ${
            isDark
              ? 'bg-gray-800 text-white border-gray-700'
              : 'bg-white text-gray-900 border-gray-300'
          }`}
        />
      </div>

      <div className="flex justify-end space-x-4">
        <button
          type="button"
          onClick={onCancel}
          className={`px-4 py-2 rounded-md ${
            isDark ? 'bg-gray-600 hover:bg-gray-700' : 'bg-gray-200 hover:bg-gray-300'
          } text-gray-800 transition duration-300`}
        >
          Cancel
        </button>
        <button
          type="submit"
          className={`px-4 py-2 rounded-md ${
            isDark ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'
          } text-white transition duration-300`}
        >
          Update Photo
        </button>
      </div>
    </form>
  );
}
