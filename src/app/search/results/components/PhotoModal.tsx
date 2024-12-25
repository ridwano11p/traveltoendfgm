"use client";

import { useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { FaTimes } from "react-icons/fa";

interface Photo {
  id: string;
  title: string;
  description?: string;
  photoUrl: string;
}

interface PhotoModalProps {
  photo: Photo;
  isDark: boolean;
  onClose: () => void;
}

export default function PhotoModal({ photo, isDark, onClose }: PhotoModalProps) {
  const handleEscape = useCallback((e: KeyboardEvent) => {
    if (e.key === "Escape") {
      onClose();
    }
  }, [onClose]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = "unset";
      document.removeEventListener("keydown", handleEscape);
    };
  }, [handleEscape]);

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
        onClick={handleBackdropClick}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        <div
          className={`max-w-4xl w-full max-h-[90vh] overflow-auto rounded-lg ${
            isDark ? "bg-gray-800" : "bg-white"
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="relative">
            <button
              onClick={onClose}
              className="absolute top-2 right-2 text-white bg-black bg-opacity-50 rounded-full p-2 hover:bg-opacity-75 transition-all duration-200 z-10"
              aria-label="Close modal"
            >
              <FaTimes size={24} />
            </button>

            <div className="relative aspect-[16/9] w-full">
              <Image
                src={photo.photoUrl}
                alt={photo.title}
                fill
                sizes="(max-width: 1536px) 100vw, 1536px"
                className="object-contain"
                priority
              />
            </div>
          </div>

          <div className="p-4">
            <h2
              id="modal-title"
              className={`text-2xl font-semibold mb-2 ${
                isDark ? "text-white" : "text-gray-800"
              }`}
            >
              {photo.title}
            </h2>

            {photo.description && (
              <p className={`${isDark ? "text-gray-300" : "text-gray-600"}`}>
                {photo.description}
              </p>
            )}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}