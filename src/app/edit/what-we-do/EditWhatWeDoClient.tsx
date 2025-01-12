"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useTheme } from '@/context/ThemeContext';
import { db, storage } from '@/lib/firebase/config';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { FaSpinner } from 'react-icons/fa';
import {
  WhatWeDoContent,
  FormState
} from './types';
import ContentEditor from './components/ContentEditor';
import ImageEditor from './components/ImageEditor';

export default function EditWhatWeDoClient() {
  const { theme } = useTheme();
  const router = useRouter();
  const isDark = theme === 'dark';

  const [content, setContent] = useState<WhatWeDoContent | null>(null);
  const [newImage, setNewImage] = useState<File | null>(null);
  const [state, setState] = useState<FormState>({
    loading: true,
    error: null,
  });

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    try {
      const docRef = doc(db, 'about', 'what_we_do');
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        setContent({
          mission: data.mission,
          approach: data.approach,
          impact: data.impact,
          imageUrl: data.imageUrl,
          updatedAt: data.updatedAt.toDate(),
        } as WhatWeDoContent);
      } else {
        setState(prev => ({ ...prev, error: "No 'What We Do' content found." }));
      }
    } catch (err) {
      console.error("Error fetching 'What We Do' content: ", err);
      setState(prev => ({ ...prev, error: "Failed to fetch content. Please try again." }));
    } finally {
      setState(prev => ({ ...prev, loading: false }));
    }
  };

  const validateContent = (): boolean => {
    if (!content) return false;

    if (content.mission.trim().length < 20) {
      setState(prev => ({ ...prev, error: "Mission statement must be at least 20 characters long." }));
      return false;
    }

    if (content.approach.trim().length < 20) {
      setState(prev => ({ ...prev, error: "Approach description must be at least 20 characters long." }));
      return false;
    }

    if (content.impact.trim().length < 20) {
      setState(prev => ({ ...prev, error: "Impact description must be at least 20 characters long." }));
      return false;
    }

    return true;
  };

  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!content) return;

    setState({ loading: true, error: null });

    if (!validateContent()) {
      setState(prev => ({ ...prev, loading: false }));
      return;
    }

    try {
      const docRef = doc(db, 'about', 'what_we_do');

      // Create the base update data
      const baseUpdateData = {
        mission: content.mission.trim(),
        approach: content.approach.trim(),
        impact: content.impact.trim(),
        updatedAt: new Date()
      };

      let imageUrl: string | undefined;

      if (newImage) {
        const imageRef = ref(storage, `what_we_do/${newImage.name}`);
        await uploadBytes(imageRef, newImage);
        imageUrl = await getDownloadURL(imageRef);

        // Delete old image if it exists
        if (content.imageUrl) {
          try {
            const oldImageRef = ref(storage, content.imageUrl);
            await deleteObject(oldImageRef);
          } catch (error) {
            console.error("Error deleting old image:", error);
          }
        }
      }

      // Use type assertion for Firestore update
      await updateDoc(docRef, {
        ...baseUpdateData,
        ...(imageUrl ? { imageUrl } : {})
      } as { [key: string]: any });

      router.push('/about/what-we-do');
    } catch (err) {
      console.error("Error updating 'What We Do' content: ", err);
      setState({
        loading: false,
        error: "Failed to update content. Please try again."
      });
    }
  };

  if (state.loading) {
    return (
      <div className={`flex justify-center items-center h-screen ${isDark ? 'bg-gray-900' : 'bg-[#90d2dc]'}`}>
        <FaSpinner className={`animate-spin text-6xl ${isDark ? 'text-white' : 'text-gray-800'}`} />
      </div>
    );
  }

  if (!content) {
    return (
      <div className={`text-center mt-8 ${isDark ? 'text-red-400' : 'text-red-600'}`}>
        {state.error || "No content found"}
      </div>
    );
  }

  return (
    <div className={`min-h-screen py-12 ${isDark ? 'bg-gray-900' : 'bg-[#90d2dc]'}`}>
      <div className="max-w-4xl mx-auto px-4">
        <h1 className={`text-4xl font-bold mb-8 text-center ${isDark ? 'text-white' : 'text-gray-800'}`}>
          Edit 'What We Do' Content
        </h1>
        <form onSubmit={handleUpdate} className="space-y-6">
          <ContentEditor
            content={content}
            onUpdate={(field, value) => setContent(prev => prev ? { ...prev, [field]: value } : null)}
            isDark={isDark}
          />

          <ImageEditor
            currentImageUrl={content.imageUrl}
            onImageChange={setNewImage}
            error={state.error}
            isDark={isDark}
          />

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={state.loading}
              className={`px-4 py-2 rounded-md ${
                isDark ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'
              } text-white transition duration-300 ${state.loading ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {state.loading ? (
                <FaSpinner className="animate-spin mx-auto" />
              ) : (
                'Update Content'
              )}
            </button>
          </div>
        </form>

        {state.error && (
          <div className={`mt-4 p-4 rounded-md ${isDark ? 'bg-red-800 text-red-100' : 'bg-red-100 text-red-800'}`}>
            {state.error}
          </div>
        )}
      </div>
    </div>
  );
}
