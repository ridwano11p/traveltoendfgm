"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useTheme } from '@/context/ThemeContext';
import { useAuth } from '@/context/AuthContext';
import { db, storage } from '@/lib/firebase/config';
import { doc, setDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { FaSpinner } from 'react-icons/fa';
import imageCompression from 'browser-image-compression';

const MAX_IMAGE_SIZE = 2 * 1024 * 1024; // 2MB

interface WhatWeDoFormData {
  mission: string;
  approach: string;
  impact: string;
  image: File | null;
}

export default function CreateWhatWeDo() {
  const { theme } = useTheme();
  const { user } = useAuth();
  const router = useRouter();
  const isDark = theme === 'dark';

  const [formData, setFormData] = useState<WhatWeDoFormData>({
    mission: '',
    approach: '',
    impact: '',
    image: null
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!user) {
      router.push('/login');
    }
  }, [user, router]);

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
        setFormData(prev => ({ ...prev, image: compressedFile }));
        setError(null);
      } catch (err) {
        console.error("Error compressing image: ", err);
        setError("Failed to process image. Please try again.");
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Form validation
    if (formData.mission.trim().length < 20) {
      setError("Mission statement must be at least 20 characters long.");
      setLoading(false);
      return;
    }

    if (formData.approach.trim().length < 20) {
      setError("Approach description must be at least 20 characters long.");
      setLoading(false);
      return;
    }

    if (formData.impact.trim().length < 20) {
      setError("Impact description must be at least 20 characters long.");
      setLoading(false);
      return;
    }

    if (!formData.image) {
      setError("Please upload an image.");
      setLoading(false);
      return;
    }

    try {
      let imageUrl = null;

      if (formData.image) {
        const imageRef = ref(storage, `what_we_do/${Date.now()}_${formData.image.name}`);
        await uploadBytes(imageRef, formData.image);
        imageUrl = await getDownloadURL(imageRef);
      }

      const whatWeDoData = {
        mission: formData.mission.trim(),
        approach: formData.approach.trim(),
        impact: formData.impact.trim(),
        imageUrl,
        updatedAt: new Date()
      };

      await setDoc(doc(db, 'about', 'what_we_do'), whatWeDoData);
      router.push('/about/what-we-do');
    } catch (err) {
      console.error("Error creating 'What We Do' info: ", err);
      setError("Failed to create 'What We Do' information. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`min-h-screen py-12 ${isDark ? 'bg-gray-900' : 'bg-[#90d2dc]'}`}>
      <div className="max-w-4xl mx-auto px-4">
        <h1 className={`text-4xl font-bold mb-8 text-center ${isDark ? 'text-white' : 'text-gray-800'}`}>
          Create &apos;What We Do&apos; Information
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="mission" className={`block mb-2 ${isDark ? 'text-white' : 'text-gray-700'}`}>Our Mission</label>
            <textarea
              id="mission"
              value={formData.mission}
              onChange={(e) => setFormData(prev => ({ ...prev, mission: e.target.value }))}
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
              value={formData.approach}
              onChange={(e) => setFormData(prev => ({ ...prev, approach: e.target.value }))}
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
              value={formData.impact}
              onChange={(e) => setFormData(prev => ({ ...prev, impact: e.target.value }))}
              required
              minLength={20}
              rows={5}
              className={`w-full px-3 py-2 border rounded-md ${
                isDark ? 'bg-gray-800 text-white border-gray-700' : 'bg-white text-gray-900 border-gray-300'
              }`}
            />
          </div>
          <div>
            <label htmlFor="image" className={`block mb-2 ${isDark ? 'text-white' : 'text-gray-700'}`}>Image</label>
            <input
              type="file"
              id="image"
              onChange={handleImageChange}
              accept="image/*"
              required
              className={`w-full px-3 py-2 border rounded-md ${
                isDark ? 'bg-gray-800 text-white border-gray-700' : 'bg-white text-gray-900 border-gray-300'
              }`}
            />
          </div>
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => router.back()}
              className={`px-4 py-2 rounded-md ${
                isDark ? 'bg-gray-600 hover:bg-gray-700' : 'bg-gray-200 hover:bg-gray-300'
              } text-gray-800 transition duration-300`}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className={`px-4 py-2 rounded-md ${
                isDark
                  ? 'bg-blue-600 hover:bg-blue-700 text-white'
                  : 'bg-blue-500 hover:bg-blue-600 text-white'
              } transition duration-300 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {loading ? (
                <FaSpinner className="animate-spin mx-auto" />
              ) : (
                "Create 'What We Do' Information"
              )}
            </button>
          </div>
        </form>
        {error && (
          <div className={`mt-4 p-4 rounded-md ${isDark ? 'bg-red-800 text-red-100' : 'bg-red-100 text-red-800'}`}>
            {error}
          </div>
        )}
      </div>
    </div>
  );
}