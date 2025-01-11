"use client";

import { SocialMediaInputsProps } from '../types';

export default function SocialMediaInputs({
  formData,
  onChange,
  isDark
}: SocialMediaInputsProps) {
  const socialInputs = [
    { id: 'linkedin', label: 'LinkedIn URL', value: formData.linkedin },
    { id: 'twitter', label: 'Twitter URL', value: formData.twitter },
    { id: 'youtube', label: 'YouTube URL', value: formData.youtube },
    { id: 'facebook', label: 'Facebook URL', value: formData.facebook },
  ];

  return (
    <>
      {socialInputs.map(({ id, label, value }) => (
        <div key={id}>
          <label
            htmlFor={id}
            className={`block mb-2 ${isDark ? 'text-white' : 'text-gray-700'}`}
          >
            {label}
          </label>
          <input
            type="url"
            id={id}
            value={value}
            onChange={(e) => onChange(id, e.target.value)}
            className={`w-full px-3 py-2 border rounded-md ${
              isDark
                ? 'bg-gray-800 text-white border-gray-700'
                : 'bg-white text-gray-900 border-gray-300'
            }`}
          />
        </div>
      ))}
    </>
  );
}
