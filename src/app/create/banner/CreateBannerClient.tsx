"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useTheme } from '@/context/ThemeContext';
import { db, storage } from '@/lib/firebase/config';
import { collection, addDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { FaSpinner } from 'react-icons/fa';
import { BannerFormData, FormState } from './types';

export default function CreateBannerClient() {
  const { theme } = useTheme();
  const router = useRouter();
  const isDark = theme === 'dark';

  // Form State
  const [formData, setFormData] = useState<BannerFormData>({
    title: '',
    description: '',
    mediaFile: null,
    youtubeUrl: '',
    isLocalMedia: true,
  });

  // UI State
  const [state, setState] = useState<FormState>({
    loading: false,
    error: null,
  });

  const validateYouTubeUrl = (url: string) => {
    const regExp = /^(?:https?:\/\/)?(?:www\.)?(?:youtube\.com|youtu\.be)\/(?:watch\?v=)?([a-zA-Z0-9_-]{11})$/;
    const match = url.match(regExp);
    return match && match[1].length === 11;
  };

  const validateForm = (): boolean => {
    if (formData.title.trim().length < 3) {
      setState(prev => ({ ...prev, error: "Title must be at least 3 characters long." }));
      return false;
    }

    if (formData.description.trim().length < 10) {
      setState(prev => ({ ...prev, error: "Description must be at least 10 characters long." }));
      return false;
    }

    if (formData.isLocalMedia && !formData.mediaFile) {
      setState(prev => ({ ...prev, error: "Please upload a media file." }));
      return false;
    }

    if (!formData.isLocalMedia) {
      if (!formData.youtubeUrl) {
        setState(prev => ({ ...prev, error: "Please provide a YouTube URL." }));
        return false;
      }

      if (!validateYouTubeUrl(formData.youtubeUrl)) {
        setState(prev => ({ ...prev, error: "Please provide a valid YouTube URL." }));
        return false;
      }
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
      let mediaUrl = formData.youtubeUrl;
      const mediaType = formData.isLocalMedia ?
        (formData.mediaFile?.type.startsWith('image/') ? 'image' : 'video') :
        'youtube';

      if (formData.isLocalMedia && formData.mediaFile) {
        const mediaRef = ref(storage, `bannerstorage/${formData.mediaFile.name}`);
        await uploadBytes(mediaRef, formData.mediaFile);
        mediaUrl = await getDownloadURL(mediaRef);
      }

      const bannerData = {
        title: formData.title.trim(),
        description: formData.description.trim(),
        mediaUrl,
        mediaType,
        isYouTube: !formData.isLocalMedia,
        youtubeId: !formData.isLocalMedia ? formData.youtubeUrl.match(/[a-zA-Z0-9_-]{11}/)?.[0] || null : null,
        createdAt: new Date(),
        updatedAt: new Date()
      };

      await addDoc(collection(db, 'banners'), bannerData);
      router.push('/');
    } catch (err) {
      console.error("Error creating banner: ", err);
      setState({ loading: false, error: "Failed to create banner. Please try again." });
    }
  };

  return (
    <div className={`min-h-screen py-12 ${isDark ? 'bg-gray-900' : 'bg-[#90d2dc]'}`}>
      <div className="max-w-4xl mx-auto px-4">
        <h1 className={`text-4xl font-bold mb-8 text-center ${isDark ? 'text-white' : 'text-gray-800'}`}>
          Create New Banner
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="title" className={`block mb-2 ${isDark ? 'text-white' : 'text-gray-700'}`}>
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
                isDark ? 'bg-gray-800 text-white border-gray-700' : 'bg-white text-gray-900 border-gray-300'
              }`}
            />
          </div>

          <div>
            <label htmlFor="description" className={`block mb-2 ${isDark ? 'text-white' : 'text-gray-700'}`}>
              Description
            </label>
            <textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              required
              minLength={10}
              rows={5}
              className={`w-full px-3 py-2 border rounded-md ${
                isDark ? 'bg-gray-800 text-white border-gray-700' : 'bg-white text-gray-900 border-gray-300'
              }`}
            />
          </div>

          <div className="flex items-center space-x-4">
            <label className={`flex items-center ${isDark ? 'text-white' : 'text-gray-700'}`}>
              <input
                type="radio"
                checked={formData.isLocalMedia}
                onChange={() => setFormData(prev => ({ ...prev, isLocalMedia: true, youtubeUrl: '' }))}
                className="mr-2"
              />
              Upload Local Media
            </label>
            <label className={`flex items-center ${isDark ? 'text-white' : 'text-gray-700'}`}>
              <input
                type="radio"
                checked={!formData.isLocalMedia}
                onChange={() => setFormData(prev => ({ ...prev, isLocalMedia: false, mediaFile: null }))}
                className="mr-2"
              />
              Add YouTube Video
            </label>
          </div>

          {formData.isLocalMedia ? (
            <div>
              <label htmlFor="mediaFile" className={`block mb-2 ${isDark ? 'text-white' : 'text-gray-700'}`}>
                Upload Media File
              </label>
              <input
                type="file"
                id="mediaFile"
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  mediaFile: e.target.files ? e.target.files[0] : null
                }))}
                accept="image/*,video/*"
                className={`w-full px-3 py-2 border rounded-md ${
                  isDark ? 'bg-gray-800 text-white border-gray-700' : 'bg-white text-gray-900 border-gray-300'
                }`}
              />
            </div>
          ) : (
            <div>
              <label htmlFor="youtubeUrl" className={`block mb-2 ${isDark ? 'text-white' : 'text-gray-700'}`}>
                YouTube Video URL
              </label>
              <input
                type="url"
                id="youtubeUrl"
                value={formData.youtubeUrl}
                onChange={(e) => setFormData(prev => ({ ...prev, youtubeUrl: e.target.value }))}
                placeholder="https://www.youtube.com/watch?v=..."
                className={`w-full px-3 py-2 border rounded-md ${
                  isDark ? 'bg-gray-800 text-white border-gray-700' : 'bg-white text-gray-900 border-gray-300'
                }`}
              />
            </div>
          )}

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
              'Create Banner'
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
