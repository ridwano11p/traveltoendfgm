"use client";

import { FaTimes } from 'react-icons/fa';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Photo } from '../types';

interface Props {
  photo: Photo;
  onClose: () => void;
}

export default function Modal({ photo, onClose }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center"
      onClick={onClose}
    >
      <div
        className="relative w-full h-full max-w-6xl mx-auto p-4 flex flex-col items-center justify-center"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2.5 text-white rounded-full bg-black/50 hover:bg-black/70 transition-colors"
          aria-label="Close modal"
        >
          <FaTimes size={24} />
        </button>

        {/* Centered image and content container */}
        <div className="relative w-full max-w-4xl flex flex-col items-center">
          <div className="relative w-full aspect-[4/3] md:aspect-auto md:h-[75vh] flex items-center justify-center">
            <Image
              src={photo.photoUrl}
              alt={photo.title}
              fill
              className="object-contain"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 80vw"
              quality={95}
              priority
            />
          </div>

          {/* Integrated content section */}
          <div className="w-full mt-4 px-6 py-4 text-center text-white">
            <h3 className="text-xl md:text-2xl font-semibold mb-2">
              {photo.title}
            </h3>
            {photo.description && (
              <p className="text-base md:text-lg leading-relaxed text-gray-100">
                {photo.description}
              </p>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
