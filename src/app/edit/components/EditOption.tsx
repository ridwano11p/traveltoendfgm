"use client";

import Link from 'next/link';
import { EditOptionProps } from '../types';

export default function EditOption({ title, description, link, disabled }: EditOptionProps) {
  if (disabled) {
    return (
      <div className={`block p-6 rounded-lg shadow-md bg-gray-700 dark:bg-gray-800 opacity-50 cursor-not-allowed`}>
        <h3 className={`text-xl font-semibold mb-2 text-gray-800 dark:text-white`}>
          {title}
        </h3>
        <p className={`text-gray-600 dark:text-gray-300`}>
          {description}
        </p>
      </div>
    );
  }

  return (
    <Link 
      href={link} 
      className={`block p-6 rounded-lg shadow-md bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition duration-300`}
    >
      <h3 className={`text-xl font-semibold mb-2 text-gray-800 dark:text-white`}>
        {title}
      </h3>
      <p className={`text-gray-600 dark:text-gray-300`}>
        {description}
      </p>
    </Link>
  );
}