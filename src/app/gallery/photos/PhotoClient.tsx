"use client";

import { useState } from 'react';
import { useTheme } from '@/context/ThemeContext';
import { AnimatePresence } from 'framer-motion';
import PhotoCard from './components/PhotoCard';
import Modal from './components/Modal';
import { Photo } from './types';

interface Props {
  photos: Photo[];
}

export default function PhotoClient({ photos }: Props) {
  const { theme } = useTheme();
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  const isDark = theme === 'dark';

  return (
    <div className={`min-h-screen py-12 ${isDark ? 'bg-gray-900' : 'bg-[#90d2dc]'}`}>
      <div className="max-w-6xl mx-auto px-4">
        <h1 className={`text-4xl font-bold mb-8 text-center ${isDark ? 'text-white' : 'text-gray-800'}`}>
          Photo Gallery
        </h1>

        {photos.length === 0 ? (
          <div className={`text-center mt-8 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
            No photos created
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {photos.map((photo) => (
              <PhotoCard
                key={photo.id}
                photo={photo}
                isDark={isDark}
                onClick={setSelectedPhoto}
              />
            ))}
          </div>
        )}

        <AnimatePresence>
          {selectedPhoto && (
            <Modal
              photo={selectedPhoto}
              isDark={isDark}
              onClose={() => setSelectedPhoto(null)}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
