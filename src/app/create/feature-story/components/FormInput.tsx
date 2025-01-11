"use client";

import { FormInputProps } from '../types';

export default function FormInput({
  id,
  label,
  value,
  onChange,
  required = false,
  minLength,
  type = 'text',
  isDark
}: FormInputProps) {
  return (
    <div>
      <label
        htmlFor={id}
        className={`block mb-2 ${isDark ? 'text-white' : 'text-gray-700'}`}
      >
        {label}
      </label>
      <input
        type={type}
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        minLength={minLength}
        className={`w-full px-3 py-2 border rounded-md ${
          isDark
            ? 'bg-gray-800 text-white border-gray-700'
            : 'bg-white text-gray-900 border-gray-300'
        }`}
      />
    </div>
  );
}
