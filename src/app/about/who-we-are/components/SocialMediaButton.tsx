"use client";

import { SocialMediaButtonProps } from '../types';

export default function SocialMediaButton({ icon, link, isDark }: SocialMediaButtonProps) {
  if (!link) return null;

  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className={`flex items-center justify-center w-10 h-10 rounded-full ${
        isDark ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'
      } transition duration-300`}
    >
      {icon}
    </a>
  );
}
