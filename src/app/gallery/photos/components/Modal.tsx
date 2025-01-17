"use client";

import { FaTimes } from 'react-icons/fa';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Photo } from '../types';
import { useEffect, useState } from 'react';

interface Props {
  photo: Photo;
  isDark: boolean;
  onClose: () => void;
}

export default function Modal({ photo, isDark, onClose }: Props) {
  const [isMobile, setIsMobile] = useState(false);

  // Check for mobile viewport
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-0 md:p-4 overflow-y-auto"
      onClick={onClose}
    >
      <div
        className={`w-full h-full md:h-auto md:max-w-4xl mx-auto md:my-4 overflow-hidden ${
          isDark ? 'bg-gray-800' : 'bg-white'
        } md:rounded-lg shadow-2xl transform transition-all ${
          isMobile ? 'flex flex-col' : ''
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Image Container */}
        <div className={`relative ${
          isMobile
            ? 'w-full h-[80vh]' // Taller on mobile
            : 'w-full h-[70vh]'
        }`}>
          <Image
            src={photo.photoUrl}
            alt={photo.title}
            fill
            className={`${
              isMobile
                ? 'object-contain !important' // Force contain on mobile
                : 'object-contain'
            }`}
            sizes="100vw"
            priority
          />
          {/* Close Button */}
          <button
            onClick={onClose}
            className={`absolute ${
              isMobile
                ? 'top-2 right-2'
                : 'top-4 right-4'
            } text-white bg-black bg-opacity-50 rounded-full p-2 hover:bg-opacity-75 transition-all duration-200 z-10 hover:rotate-90 transform`}
            aria-label="Close modal"
          >
            <FaTimes size={isMobile ? 20 : 24} />
          </button>
        </div>

        {/* Content Section */}
        <div className={`
          ${isMobile ? 'flex-1 min-h-0' : ''}
          ${isDark ? 'border-gray-700' : 'border-gray-200'}
          p-4 md:p-6 border-t overflow-y-auto
        `}>
          <h3 className={`text-lg md:text-xl font-semibold mb-2 md:mb-3 ${
            isDark ? 'text-white' : 'text-gray-800'
          }`}>
            {photo.title}
          </h3>
          {photo.description && (
            <div className={`prose max-w-none ${isDark ? 'prose-invert' : ''}`}>
              <p className={`${
                isDark ? 'text-gray-300' : 'text-gray-600'
              } text-sm leading-relaxed`}>
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
