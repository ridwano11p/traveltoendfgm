"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useTheme } from '@/context/ThemeContext';
import { db, storage } from '@/lib/firebase/config';
import { collection, addDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { PhotoFormData, FormState } from './types';
import PhotoUpload from './components/PhotoUpload';
import FormButtons from './components/FormButtons';

export default function CreatePhotoClient() {
  const { theme } = useTheme();
  const router = useRouter();
  const isDark = theme === 'dark';

  const [formData, setFormData] = useState<PhotoFormData>({
    title: '',
    description: '',
    photo: null,
  });

  const [state, setState] = useState<FormState>({
    loading: false,
    error: null,
  });

  const validateForm = (): boolean => {
    if (formData.title.trim().length < 3) {
      setState(prev => ({ ...prev, error: "Title must be at least 3 characters long." }));
      return false;
    }
    if (formData.description.trim().length < 10) {
      setState(prev => ({ ...prev, error: "Description must be at least 10 characters long." }));
      return false;
    }
    if (!formData.photo) {
      setState(prev => ({ ...prev, error: "Please select a photo to upload." }));
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
      const photoRef = ref(storage, `photos/${Date.now()}_${formData.photo!.name}`);
      await uploadBytes(photoRef, formData.photo!);
      const photoUrl = await getDownloadURL(photoRef);

      const photoData = {
        title: formData.title.trim(),
        description: formData.description.trim(),
        photoUrl,
        createdAt: new Date(),
        updatedAt: new Date()
      };

      await addDoc(collection(db, 'photos'), photoData);
      router.push('/gallery/photos');
    } catch (err) {
      console.error("Error creating photo: ", err);
      setState({
        loading: false,
        error: "Failed to upload photo. Please try again."
      });
    }
  };

  return (
    <div className={`min-h-screen py-12 ${isDark ? 'bg-gray-900' : 'bg-[#90d2dc]'}`}>
      <div className="max-w-4xl mx-auto px-4">
        <h1 className={`text-4xl font-bold mb-8 text-center ${isDark ? 'text-white' : 'text-gray-800'}`}>
          Upload New Photo
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="title"
              className={`block mb-2 ${isDark ? 'text-white' : 'text-gray-700'}`}
            >
              Title
            </label>
            <input
              type="text"
              id="title"
              value={formData.title}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              required
              minLength={3}
              className={`w-full px-3 py-2 border rounded-md ${
                isDark
                  ? 'bg-gray-800 text-white border-gray-700'
                  : 'bg-white text-gray-900 border-gray-300'
              }`}
            />
          </div>

          <div>
            <label
              htmlFor="description"
              className={`block mb-2 ${isDark ? 'text-white' : 'text-gray-700'}`}
            >
              Description
            </label>
            <textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              required
              minLength={10}
              rows={4}
              className={`w-full px-3 py-2 border rounded-md ${
                isDark
                  ? 'bg-gray-800 text-white border-gray-700'
                  : 'bg-white text-gray-900 border-gray-300'
              }`}
            />
          </div>

          <PhotoUpload
            onFileChange={(file) => setFormData(prev => ({ ...prev, photo: file }))}
            isDark={isDark}
          />

          <FormButtons
            loading={state.loading}
            isDark={isDark}
            onCancel={() => router.back()}
          />
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
