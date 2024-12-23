"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useTheme } from '@/context/ThemeContext';
import { useAuth } from '@/context/AuthContext';
import { db, storage } from '@/lib/firebase/config';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { FaSpinner } from 'react-icons/fa';
import Image from 'next/image';
import imageCompression from 'browser-image-compression';

const MAX_IMAGE_SIZE = 2 * 1024 * 1024; // 2MB

interface WhatWeDoContent {
  mission: string;
  approach: string;
  impact: string;
  imageUrl?: string;
  updatedAt: Date;
}

export default function EditWhatWeDo() {
  const { theme } = useTheme();
  const { user } = useAuth();
  const router = useRouter();
  const isDark = theme === 'dark';

  const [content, setContent] = useState<WhatWeDoContent | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [newImage, setNewImage] = useState<File | null>(null);

  useEffect(() => {
    if (!user) {
      router.push('/login');
    } else {
      fetchContent();
    }
  }, [user, router]);

  const fetchContent = async () => {
    setLoading(true);
    try {
      const docRef = doc(db, 'about', 'what_we_do');
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setContent(docSnap.data() as WhatWeDoContent);
      } else {
        setError("No 'What We Do' content found.");
      }
    } catch (err) {
      console.error("Error fetching 'What We Do' content: ", err);
      setError("Failed to fetch content. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > MAX_IMAGE_SIZE) {
        setError(`Image size should be less than ${MAX_IMAGE_SIZE / (1024 * 1024)}MB`);
        return;
      }
      
      try {
        const compressedFile = await imageCompression(file, {
          maxSizeMB: MAX_IMAGE_SIZE / (1024 * 1024),
          maxWidthOrHeight: 1920
        });
        setNewImage(compressedFile);
      } catch (err) {
        console.error("Error compressing image: ", err);
        setError("Failed to process image. Please try again.");
      }
    }
  };

  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!content) return;

    setLoading(true);
    setError(null);

    if (content.mission.trim().length < 20) {
      setError("Mission statement must be at least 20 characters long.");
      setLoading(false);
      return;
    }

    if (content.approach.trim().length < 20) {
      setError("Approach description must be at least 20 characters long.");
      setLoading(false);
      return;
    }

    if (content.impact.trim().length < 20) {
      setError("Impact description must be at least 20 characters long.");
      setLoading(false);
      return;
    }

    try {
      const docRef = doc(db, 'about', 'what_we_do');
      let updateData: Partial<WhatWeDoContent> & { updatedAt: Date } = {
        mission: content.mission.trim(),
        approach: content.approach.trim(),
        impact: content.impact.trim(),
        updatedAt: new Date()
      };

      if (newImage) {
        const imageRef = ref(storage, `what_we_do/${newImage.name}`);
        await uploadBytes(imageRef, newImage);
        const imageUrl = await getDownloadURL(imageRef);
        updateData.imageUrl = imageUrl;

        // Delete old image if it exists
        if (content.imageUrl) {
          const oldImageRef = ref(storage, content.imageUrl);
          await deleteObject(oldImageRef);
        }
      }

      await updateDoc(docRef, updateData);
      router.push('/about/what-we-do');
    } catch (err) {
      console.error("Error updating 'What We Do' content: ", err);
      setError("Failed to update content. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className={`flex justify-center items-center h-screen ${isDark ? 'bg-gray-900' : 'bg-[#90d2dc]'}`}>
        <FaSpinner className={`animate-spin text-6xl ${isDark ? 'text-white' : 'text-gray-800'}`} />
      </div>
    );
  }

  if (error) {
    return <div className={`text-center mt-8 ${isDark ? 'text-red-400' : 'text-red-600'}`}>{error}</div>;
  }

  return (
    <div className={`min-h-screen py-12 ${isDark ? 'bg-gray-900' : 'bg-[#90d2dc]'}`}>
      <div className="max-w-4xl mx-auto px-4">
        <h1 className={`text-4xl font-bold mb-8 text-center ${isDark ? 'text-white' : 'text-gray-800'}`}>
          Edit 'What We Do' Content
        </h1>
        {content && (
          <form onSubmit={handleUpdate} className="space-y-6">
            <div>
              <label htmlFor="mission" className={`block mb-2 ${isDark ? 'text-white' : 'text-gray-700'}`}>Our Mission</label>
              <textarea
                id="mission"
                value={content.mission}
                onChange={(e) => setContent({...content, mission: e.target.value})}
                required
                minLength={20}
                rows={5}
                className={`w-full px-3 py-2 border rounded-md ${
                  isDark ? 'bg-gray-800 text-white border-gray-700' : 'bg-white text-gray-900 border-gray-300'
                }`}
              />
            </div>
            <div>
              <label htmlFor="approach" className={`block mb-2 ${isDark ? 'text-white' : 'text-gray-700'}`}>Our Approach</label>
              <textarea
                id="approach"
                value={content.approach}
                onChange={(e) => setContent({...content, approach: e.target.value})}
                required
                minLength={20}
                rows={5}
                className={`w-full px-3 py-2 border rounded-md ${
                  isDark ? 'bg-gray-800 text-white border-gray-700' : 'bg-white text-gray-900 border-gray-300'
                }`}
              />
            </div>
            <div>
              <label htmlFor="impact" className={`block mb-2 ${isDark ? 'text-white' : 'text-gray-700'}`}>Our Impact</label>
              <textarea
                id="impact"
                value={content.impact}
                onChange={(e) => setContent({...content, impact: e.target.value})}
                required
                minLength={20}
                rows={5}
                className={`w-full px-3 py-2 border rounded-md ${
                  isDark ? 'bg-gray-800 text-white border-gray-700' : 'bg-white text-gray-900 border-gray-300'
                }`}
              />
            </div>
            <div>
              <label htmlFor="image" className={`block mb-2 ${isDark ? 'text-white' : 'text-gray-700'}`}>New Image</label>
              <input
                type="file"
                id="image"
                onChange={handleImageChange}
                accept="image/*"
                className={`w-full px-3 py-2 border rounded-md ${
                  isDark ? 'bg-gray-800 text-white border-gray-700' : 'bg-white text-gray-900 border-gray-300'
                }`}
              />
            </div>
            {content.imageUrl && (
              <div>
                <p className={`mb-2 ${isDark ? 'text-white' : 'text-gray-700'}`}>Current Image:</p>
                <div className="relative w-full h-64">
                  <Image
                    src={content.imageUrl}
                    alt="What We Do"
                    fill
                    className="rounded-md object-cover"
                  />
                </div>
              </div>
            )}
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={loading}
                className={`px-4 py-2 rounded-md ${
                  isDark ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'
                } text-white transition duration-300 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {loading ? <FaSpinner className="animate-spin mx-auto" /> : 'Update Content'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}