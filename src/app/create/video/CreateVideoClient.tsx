"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useTheme } from '@/context/ThemeContext';
import { db, storage } from '@/lib/firebase/config';
import { collection, addDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { FaSpinner } from 'react-icons/fa';
import { VideoFormData, FormState } from './types';
import { generateThumbnail, validateYouTubeUrl, extractYoutubeId } from './utils/thumbnailGenerator';
import VideoTypeToggle from './components/VideoTypeToggle';
import VideoUpload from './components/VideoUpload';
import YouTubeInput from './components/YouTubeInput';

export default function CreateVideoClient() {
  const { theme } = useTheme();
  const router = useRouter();
  const isDark = theme === 'dark';

  const [formData, setFormData] = useState<VideoFormData>({
    title: '',
    description: '',
    videoFile: null,
    youtubeUrl: '',
    thumbnail: null,
    isLocalVideo: true,
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

    if (formData.isLocalVideo && !formData.videoFile) {
      setState(prev => ({ ...prev, error: "Please upload a video file." }));
      return false;
    }

    if (!formData.isLocalVideo) {
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
      let videoUrl = formData.youtubeUrl;
      let thumbnailUrl = null;

      if (formData.isLocalVideo && formData.videoFile) {
        const videoRef = ref(storage, `videos/${formData.videoFile.name}`);
        await uploadBytes(videoRef, formData.videoFile);
        videoUrl = await getDownloadURL(videoRef);

        if (formData.thumbnail) {
          const thumbnailRef = ref(storage, `video_thumbnails/${formData.thumbnail.name}`);
          await uploadBytes(thumbnailRef, formData.thumbnail);
          thumbnailUrl = await getDownloadURL(thumbnailRef);
        } else {
          // Generate thumbnail if not provided
          const generatedThumbnail = await generateThumbnail(formData.videoFile);
          const thumbnailRef = ref(storage, `video_thumbnails/generated_${formData.videoFile.name}.jpg`);
          await uploadBytes(thumbnailRef, generatedThumbnail);
          thumbnailUrl = await getDownloadURL(thumbnailRef);
        }
      }

      const videoData = {
        title: formData.title.trim(),
        description: formData.description.trim(),
        videoUrl,
        thumbnailUrl,
        isYouTube: !formData.isLocalVideo,
        youtubeId: !formData.isLocalVideo ? extractYoutubeId(formData.youtubeUrl) : null,
        createdAt: new Date(),
        updatedAt: new Date()
      };

      await addDoc(collection(db, 'videos'), videoData);
      router.push('/documentaries/videos');
    } catch (err) {
      console.error("Error creating video: ", err);
      setState({
        loading: false,
        error: "Failed to create video. Please try again."
      });
    }
  };

  return (
    <div className={`min-h-screen py-12 ${isDark ? 'bg-gray-900' : 'bg-[#90d2dc]'}`}>
      <div className="max-w-4xl mx-auto px-4">
        <h1 className={`text-4xl font-bold mb-8 text-center ${isDark ? 'text-white' : 'text-gray-800'}`}>
          Add New Video
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
              rows={5}
              className={`w-full px-3 py-2 border rounded-md ${
                isDark
                  ? 'bg-gray-800 text-white border-gray-700'
                  : 'bg-white text-gray-900 border-gray-300'
              }`}
            />
          </div>

          <VideoTypeToggle
            isLocalVideo={formData.isLocalVideo}
            onToggle={(isLocal) => setFormData(prev => ({
              ...prev,
              isLocalVideo: isLocal,
              videoFile: null,
              youtubeUrl: '',
              thumbnail: null
            }))}
            isDark={isDark}
          />

          {formData.isLocalVideo ? (
            <VideoUpload
              onVideoChange={(file) => setFormData(prev => ({ ...prev, videoFile: file }))}
              onThumbnailChange={(file) => setFormData(prev => ({ ...prev, thumbnail: file }))}
              isDark={isDark}
            />
          ) : (
            <YouTubeInput
              value={formData.youtubeUrl}
              onChange={(value) => setFormData(prev => ({ ...prev, youtubeUrl: value }))}
              isDark={isDark}
            />
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
              'Add Video'
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
