"use client";

import { FormButtonsProps } from '../types';
import { FaSpinner } from 'react-icons/fa';

export default function FormButtons({ loading, isDark, onCancel }: FormButtonsProps) {
  return (
    <div className="flex justify-end space-x-4">
      <button
        type="button"
        onClick={onCancel}
        className={`px-4 py-2 rounded-md ${
          isDark
            ? 'bg-gray-600 hover:bg-gray-700'
            : 'bg-gray-200 hover:bg-gray-300'
        } text-gray-800 transition duration-300`}
      >
        Cancel
      </button>
      <button
        type="submit"
        disabled={loading}
        className={`px-4 py-2 rounded-md ${
          isDark
            ? 'bg-blue-600 hover:bg-blue-700 text-white'
            : 'bg-blue-500 hover:bg-blue-600 text-white'
        } transition duration-300 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        {loading ? (
          <FaSpinner className="animate-spin mx-auto" />
        ) : (
          'Upload Photo'
        )}
      </button>
    </div>
  );
}
