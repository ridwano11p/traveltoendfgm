"use client";

import { SubmitButtonProps } from '../types';
import { FaSpinner } from 'react-icons/fa';

export default function SubmitButton({ loading, isDark }: SubmitButtonProps) {
  return (
    <button
      type="submit"
      disabled={loading}
      className={`w-full px-4 py-2 rounded-md ${
        isDark
          ? 'bg-blue-600 hover:bg-blue-700 text-white'
          : 'bg-blue-500 hover:bg-blue-600 text-white'
      } transition duration-300 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
    >
      {loading ? (
        <FaSpinner className="animate-spin mx-auto" />
      ) : (
        'Create Feature Story'
      )}
    </button>
  );
}
