"use client";

import Link from 'next/link';
import { useTheme } from '@/context/ThemeContext';

interface CreateOptionProps {
  title: string;
  description: string;
  link: string;
  disabled?: boolean;
}

export default function CreateOption({ title, description, link, disabled = false }: CreateOptionProps) {
  const { theme } = useTheme();

  if (disabled) {
    return (
      <div className={`block p-6 rounded-lg shadow-md ${theme === "dark" ? 'bg-gray-900' : 'bg-gray-200'} opacity-50 cursor-not-allowed`}>
        <h3 className={`text-xl font-semibold mb-2 ${theme === "dark" ? 'text-white' : 'text-gray-800'}`}>{title}</h3>
        <p className={`${theme === "dark" ? 'text-gray-300' : 'text-gray-600'}`}>{description}</p>
      </div>
    );
  }

  return (
    <Link 
      href={link} 
      className={`block p-6 rounded-lg shadow-md ${
        theme === "dark" ? 'bg-gray-900 hover:bg-gray-200/10' : 'bg-[#90d2dc] hover:bg-green-300'
      } transition duration-300`}
    >
      <h3 className={`text-xl font-semibold mb-2 ${theme === "dark" ? 'text-white' : 'text-gray-800'}`}>{title}</h3>
      <p className={`${theme === "dark" ? 'text-gray-300' : 'text-gray-600'}`}>{description}</p>
    </Link>
  );
}