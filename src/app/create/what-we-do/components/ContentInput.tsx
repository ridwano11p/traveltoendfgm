"use client";

import { ContentInputProps } from '../types';

export default function ContentInput({
  id,
  label,
  value,
  onChange,
  isDark
}: ContentInputProps) {
  return (
    <div>
      <label
        htmlFor={id}
        className={`block mb-2 ${isDark ? 'text-white' : 'text-gray-700'}`}
      >
        {label}
      </label>
      <textarea
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required
        minLength={20}
        rows={5}
        className={`w-full px-3 py-2 border rounded-md ${
          isDark
            ? 'bg-gray-800 text-white border-gray-700'
            : 'bg-white text-gray-900 border-gray-300'
        }`}
      />
    </div>
  );
}
