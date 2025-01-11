"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useTheme } from '@/context/ThemeContext';
import { db, storage } from '@/lib/firebase/config';
import { doc, setDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { FaSpinner } from 'react-icons/fa';
import { WhatWeDoFormData, FormState } from './types';
import ContentInput from './components/ContentInput';
import ImageUpload from './components/ImageUpload';

export default function CreateWhatWeDoClient() {
  const { theme } = useTheme();
  const router = useRouter();
  const isDark = theme === 'dark';

  const [formData, setFormData] = useState<WhatWeDoFormData>({
    mission: '',
    approach: '',
    impact: '',
    image: null,
  });

  const [state, setState] = useState<FormState>({
    loading: false,
    error: null,
  });

  const validateForm = (): boolean => {
    if (formData.mission.trim().length < 20) {
      setState(prev => ({ ...prev, error: "Mission statement must be at least 20 characters long." }));
      return false;
    }

    if (formData.approach.trim().length < 20) {
      setState(prev => ({ ...prev, error: "Approach description must be at least 20 characters long." }));
      return false;
    }

    if (formData.impact.trim().length < 20) {
      setState(prev => ({ ...prev, error: "Impact description must be at least 20 characters long." }));
      return false;
    }

    if (!formData.image) {
      setState(prev => ({ ...prev, error: "Please upload an image." }));
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setState({ loading: true, error: null });

    if (!validateForm()) {
      setState(prev => ({ ...prev, loading: false }));
      return;
    }

    try {
      let imageUrl = null;

      if (formData.image) {
        const imageRef = ref(storage, `what_we_do/${formData.image.name}`);
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
      setState({
        loading: false,
        error: "Failed to create 'What We Do' information. Please try again."
      });
    }
  };

  return (
    <div className={`min-h-screen py-12 ${isDark ? 'bg-gray-900' : 'bg-[#90d2dc]'}`}>
      <div className="max-w-4xl mx-auto px-4">
        <h1 className={`text-4xl font-bold mb-8 text-center ${isDark ? 'text-white' : 'text-gray-800'}`}>
          Create 'What We Do' Information
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <ContentInput
            id="mission"
            label="Our Mission"
            value={formData.mission}
            onChange={(value) => setFormData(prev => ({ ...prev, mission: value }))}
            isDark={isDark}
          />

          <ContentInput
            id="approach"
            label="Our Approach"
            value={formData.approach}
            onChange={(value) => setFormData(prev => ({ ...prev, approach: value }))}
            isDark={isDark}
          />

          <ContentInput
            id="impact"
            label="Our Impact"
            value={formData.impact}
            onChange={(value) => setFormData(prev => ({ ...prev, impact: value }))}
            isDark={isDark}
          />

          <ImageUpload
            onImageChange={(file) => setFormData(prev => ({ ...prev, image: file }))}
            isDark={isDark}
            error={state.error}
          />

          <button
            type="submit"
            disabled={state.loading}
            className={`w-full px-4 py-2 rounded-md ${
              isDark
                ? 'bg-blue-600 hover:bg-blue-700 text-white'
                : 'bg-blue-500 hover:bg-blue-600 text-white'
            } transition duration-300 ${state.loading ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {state.loading ? (
              <FaSpinner className="animate-spin mx-auto" />
            ) : (
              "Create 'What We Do' Information"
            )}
          </button>
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
