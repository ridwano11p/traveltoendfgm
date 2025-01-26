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
      className="fixed inset-0 flex items-center justify-center z-50 p-4 bg-black/75"
      onClick={onClose}
    >
      <div
        className={`relative w-full max-w-3xl mx-auto flex flex-col overflow-hidden rounded-xl ${
          isDark ? 'text-white' : 'text-gray-900'
        }`}
        style={{ maxHeight: '90vh' }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Image Container */}
        <div className="relative w-full" style={{ height: isMobile ? '50vh' : '60vh' }}>
          <Image
            src={photo.photoUrl}
            alt={photo.title}
            fill
            className="object-contain"
            sizes="(max-width: 768px) 100vw, 80vw"
            quality={95}
            priority
          />
          
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-2 right-2 md:top-4 md:right-4 text-white hover:text-gray-200 z-10 p-2 rounded-full bg-black/40 hover:bg-black/60 transition-all duration-200 hover:rotate-90 transform"
            aria-label="Close modal"
          >
            <FaTimes size={isMobile ? 20 : 24} />
          </button>
        </div>

        {/* Content Section */}
        <div className={`space-y-4 p-6 backdrop-blur-md rounded-b-xl ${
          isDark
            ? 'bg-gray-900/80 text-white'
            : 'bg-white/90 text-gray-900'
        }`}>
          <h3 className={`text-xl md:text-2xl font-semibold ${
            isDark ? 'text-white' : 'text-gray-900'
          }`}>
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
