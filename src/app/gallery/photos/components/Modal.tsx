"use client";

import { FaTimes } from 'react-icons/fa';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Photo } from '../types';

interface Props {
  photo: Photo;
  isDark: boolean;
  onClose: () => void;
}

export default function Modal({ photo, isDark, onClose }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-4 overflow-y-auto"
      onClick={onClose}
    >
      <div
        className={`max-w-4xl w-full mx-auto my-4 overflow-hidden ${
          isDark ? 'bg-gray-800' : 'bg-white'
        } rounded-lg shadow-2xl transform transition-all`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Image Container */}
        <div className="relative w-full h-[70vh]">
          <Image
            src={photo.photoUrl}
            alt={photo.title}
            fill
            className="object-contain"
            sizes="(max-width: 1024px) 100vw, 1024px"
            priority
          />
          {/* Close Button - Positioned relative to image container */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white bg-black bg-opacity-50 rounded-full p-2 hover:bg-opacity-75 transition-all duration-200 z-10 hover:rotate-90 transform"
            aria-label="Close modal"
          >
            <FaTimes size={24} />
          </button>
        </div>

        {/* Content Section */}
        <div className={`p-6 border-t ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
          <h3 className={`text-xl font-semibold mb-3 ${isDark ? 'text-white' : 'text-gray-800'}`}>
            {photo.title}
          </h3>
          {photo.description && (
            <div className={`prose max-w-none ${isDark ? 'prose-invert' : ''}`}>
              <p className={`${isDark ? 'text-gray-300' : 'text-gray-600'} text-sm leading-relaxed`}>
                {photo.description}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Backdrop click area */}
      <div
        className="fixed inset-0 -z-10"
        onClick={onClose}
        aria-label="Close modal"
      />
    </motion.div>
  );
}
