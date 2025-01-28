"use client";

import { FaTimes } from 'react-icons/fa';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useEffect } from 'react';
import { Photo } from '../types';

interface Props {
  photo: Photo;
  onClose: () => void;
}

export default function Modal({ photo, onClose }: Props) {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-black/90 flex items-start justify-center overflow-y-auto"
      onClick={onClose}
    >
      {/* Desktop Layout */}
      <div className="hidden md:flex relative w-full h-full max-w-6xl mx-auto p-4 flex-col items-center justify-center"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2.5 text-white rounded-full bg-black/50 hover:bg-black/70 transition-colors"
          aria-label="Close modal"
        >
          <FaTimes size={24} />
        </button>

        <div className="relative w-full max-w-4xl flex flex-col items-center">
          <div className="relative w-full h-[75vh] flex items-center justify-center">
            <Image
              src={photo.photoUrl}
              alt={photo.title}
              fill
              className="object-contain"
              sizes="(max-width: 1200px) 90vw, 80vw"
              quality={95}
              priority
            />
          </div>

          <div className="w-full mt-4 px-6 py-4 text-center text-white">
            <h3 className="text-2xl font-semibold mb-2">
              {photo.title}
            </h3>
            {photo.description && (
              <p className="text-lg leading-relaxed text-gray-100">
                {photo.description}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="md:hidden relative w-full h-full p-2 flex items-center justify-center"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-2 right-2 z-20 p-1.5 text-white rounded-full bg-black/50 hover:bg-black/70 transition-colors"
          aria-label="Close modal"
        >
          <FaTimes size={18} />
        </button>

        {/* Portrait layout */}
        <div className="portrait:flex hidden relative w-full max-w-lg flex-col items-center justify-center h-full">
          <div className="relative w-full flex-1 flex items-center justify-center">
            <div className="relative w-full aspect-[4/3]">
              <Image
                src={photo.photoUrl}
                alt={photo.title}
                fill
                className="object-contain"
                sizes="100vw"
                quality={95}
                priority
              />
            </div>
          </div>

          <div className="w-full mt-2 px-3 py-2 text-center text-white">
            <h3 className="text-lg font-semibold mb-1">
              {photo.title}
            </h3>
            {photo.description && (
              <p className="text-sm leading-relaxed text-gray-100">
                {photo.description}
              </p>
            )}
          </div>
        </div>

        {/* Revised Landscape layout */}
        <div className="landscape:flex hidden relative w-full min-h-screen p-4">
          <div className="w-1/2 sticky top-0 h-screen flex items-center justify-center">
            <div className="relative w-full h-4/5">
              <Image
                src={photo.photoUrl}
                alt={photo.title}
                fill
                className="object-contain"
                sizes="50vw"
                quality={95}
                priority
              />
            </div>
          </div>

          <div className="w-1/2 py-4 px-6">
            <div className="sticky top-4">
              <div className="space-y-2">
                <h3 className="text-sm font-semibold text-white">
                  {photo.title}
                </h3>
                {photo.description && (
                  <div className="max-h-[calc(100vh-8rem)] overflow-y-auto">
                    <p className="text-xs leading-relaxed text-gray-100">
                      {photo.description}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
