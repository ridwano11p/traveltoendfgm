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
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="fixed inset-0 flex items-center justify-center z-50 p-4 md:p-6 lg:p-8 bg-black/75"
      onClick={onClose}
    >
      <div
        className={`relative w-full max-w-3xl mx-auto overflow-hidden rounded-xl ${
          isDark ? 'text-white' : 'text-gray-900'
        }`}
        style={{ maxHeight: isMobile ? '95vh' : '90vh' }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button - Moved outside image container for better positioning */}
        <button
          onClick={onClose}
          className="absolute top-0 right-0 text-white hover:text-gray-200 z-20 p-3 rounded-tl-xl bg-black/60 hover:bg-black/80 transition-all duration-200 hover:rotate-90 transform"
          aria-label="Close modal"
        >
          <FaTimes size={isMobile ? 22 : 26} />
        </button>

        {/* Image Container */}
        <div className="w-full" style={{ height: isMobile ? '45vh' : '65vh' }}>
          <Image
            src={photo.photoUrl}
            alt={photo.title}
            fill
            className="object-contain"
            sizes="(max-width: 768px) 100vw, 90vw"
            quality={95}
            priority
          />
        </div>

        {/* Content Section */}
        <div className={`w-full space-y-4 p-6 backdrop-blur-md ${
          isDark
            ? 'bg-gray-900/90 text-white'
            : 'bg-white/95 text-gray-900'
        }`}>
          <h3 className="text-xl md:text-2xl font-semibold">
            {photo.title}
          </h3>
          {photo.description && (
            <p className={`text-base md:text-lg leading-relaxed ${
              isDark ? 'text-gray-100' : 'text-gray-700'
            }`}>
              {photo.description}
            </p>
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
