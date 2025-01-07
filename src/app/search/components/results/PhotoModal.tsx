"use client";

import { PhotoModalProps } from '../../types';
import { motion } from 'framer-motion';
import { FaTimes } from 'react-icons/fa';
import Image from 'next/image';

export default function PhotoModal({ photo, isDark, onClose }: PhotoModalProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className={`max-w-4xl w-full mx-auto rounded-lg overflow-hidden ${
          isDark ? 'bg-gray-800' : 'bg-white'
        } shadow-2xl`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative w-full h-[70vh]">
          <Image
            src={photo.photoUrl}
            alt={photo.title}
            fill
            className="object-contain"
            sizes="(max-width: 1024px) 100vw, 1024px"
          />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white bg-black bg-opacity-50 rounded-full p-2 hover:bg-opacity-75 transition-all duration-200 z-10 hover:rotate-90 transform"
            aria-label="Close modal"
          >
            <FaTimes size={24} />
          </button>
        </div>
        <div className={`p-6 border-t ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
          <h3 className={`text-xl font-semibold mb-3 ${isDark ? 'text-white' : 'text-gray-800'}`}>
            {photo.title}
          </h3>
          {photo.description && (
            <p className={`${isDark ? 'text-gray-300' : 'text-gray-600'} text-sm`}>
              {photo.description}
            </p>
          )}
        </div>
      </div>
    </motion.div>
  );
}
