"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useTheme } from '@/context/ThemeContext';
import { useAuth } from '@/context/AuthContext';
import { db, storage } from '@/lib/firebase/config';
import { collection, addDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { FaSpinner } from 'react-icons/fa';

interface VideoFormData {
  title: string;
  description: string;
  videoFile: File | null;
  youtubeUrl: string;
  thumbnail: File | null;
  isLocalVideo: boolean;
}

export default function CreateVideo() {
  const { theme } = useTheme();
  const { user } = useAuth();
  const router = useRouter();
  const isDark = theme === 'dark';

  const [formData, setFormData] = useState<VideoFormData>({
    title: '',
    description: '',
    videoFile: null,
    youtubeUrl: '',
    thumbnail: null,
    isLocalVideo: true
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!user) {
      router.push('/login');
    }
  }, [user, router]);

  const handleVideoFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData(prev => ({ ...prev, videoFile: file }));
    }
  };

  const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData(prev => ({ ...prev, thumbnail: file }));
    }
  };

  const validateYouTubeUrl = (url: string): boolean => {
    const regExp = /^(?:https?:\/\/)?(?:www\.)?(?:youtube\.com|youtu\.be)\/(?:watch\?v=)?([a-zA-Z0-9_-]{11})$/;
    const match = url.match(regExp);
    return match !== null && match[1].length === 11;
  };

  const generateThumbnail = (videoFile: File): Promise<File> => {
    return new Promise((resolve, reject) => {
      const video = document.createElement('video');
      video.src = URL.createObjectURL(videoFile);
      video.load();
      video.onloadeddata = () => {
        video.currentTime = 1; // Capture frame at 1 second
      };
      video.onseeked = () => {
        const canvas = document.createElement('canvas');
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        canvas.getContext('2d')?.drawImage(video, 0, 0, canvas.width, canvas.height);
        canvas.toBlob((blob) => {
          if (blob) {
            resolve(new File([blob], 'thumbnail.jpg', { type: 'image/jpeg' }));
          } else {
            reject(new Error('Failed to generate thumbnail'));
          }
        }, 'image/jpeg', 0.95);
      };
      video.onerror = reject;
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Form validation
    if (formData.title.trim().length < 3) {
      setError("Title must be at least 3 characters long.");
      setLoading(false);
      return;
    }

    if (formData.description.trim().length < 10) {
      setError("Description must be at least 10 characters long.");
      setLoading(false);
      return;
    }

    if (formData.isLocalVideo && !formData.videoFile) {
      setError("Please upload a video file.");
      setLoading(false);
      return;
    }

    if (!formData.isLocalVideo) {
      if (!formData.youtubeUrl) {
        setError("Please provide a YouTube URL.");
        setLoading(false);
        return;
      }

      if (!validateYouTubeUrl(formData.youtubeUrl)) {
        setError("Please provide a valid YouTube URL.");
        setLoading(false);
        return;
      }
    }

    try {
      let videoUrl = formData.youtubeUrl;
      let thumbnailUrl = null;

      if (formData.isLocalVideo && formData.videoFile) {
        const videoRef = ref(storage, `videos/${Date.now()}_${formData.videoFile.name}`);
        await uploadBytes(videoRef, formData.videoFile);
        videoUrl = await getDownloadURL(videoRef);

        if (formData.thumbnail) {
          const thumbnailRef = ref(storage, `video_thumbnails/${Date.now()}_${formData.thumbnail.name}`);
          await uploadBytes(thumbnailRef, formData.thumbnail);
          thumbnailUrl = await getDownloadURL(thumbnailRef);
        } else {
          // Generate thumbnail if not provided
          const generatedThumbnail = await generateThumbnail(formData.videoFile);
          const thumbnailRef = ref(storage, `video_thumbnails/generated_${Date.now()}_${formData.videoFile.name}.jpg`);
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
        youtubeId: !formData.isLocalVideo ? formData.youtubeUrl.match(/[a-zA-Z0-9_-]{11}/)?.[0] : null,
        createdAt: new Date(),
        updatedAt: new Date()
      };

      await addDoc(collection(db, 'videos'), videoData);
      router.push('/documentaries/videos');
    } catch (err) {
      console.error("Error creating video: ", err);
      setError("Failed to create video. Please try again.");
    } finally {
      setLoading(false);
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
            <label htmlFor="title" className={`block mb-2 ${isDark ? 'text-white' : 'text-gray-700'}`}>Title</label>
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
            <label htmlFor="description" className={`block mb-2 ${isDark ? 'text-white' : 'text-gray-700'}`}>Description</label>
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
                checked={formData.isLocalVideo}
                onChange={() => setFormData(prev => ({ ...prev, isLocalVideo: true }))}
                className="mr-2"
              />
              Upload Local Video
            </label>
            <label className={`flex items-center ${isDark ? 'text-white' : 'text-gray-700'}`}>
              <input
                type="radio"
                checked={!formData.isLocalVideo}
                onChange={() => setFormData(prev => ({ ...prev, isLocalVideo: false }))}
                className="mr-2"
              />
              Add YouTube Video
            </label>
          </div>
          {formData.isLocalVideo ? (
            <>
              <div>
                <label htmlFor="videoFile" className={`block mb-2 ${isDark ? 'text-white' : 'text-gray-700'}`}>Upload Video File</label>
                <input
                  type="file"
                  id="videoFile"
                  onChange={handleVideoFileChange}
                  accept="video/*"
                  className={`w-full px-3 py-2 border rounded-md ${
                    isDark ? 'bg-gray-800 text-white border-gray-700' : 'bg-white text-gray-900 border-gray-300'
                  }`}
                />
              </div>
              <div>
                <label htmlFor="thumbnail" className={`block mb-2 ${isDark ? 'text-white' : 'text-gray-700'}`}>Thumbnail Image (Optional)</label>
                <input
                  type="file"
                  id="thumbnail"
                  onChange={handleThumbnailChange}
                  accept="image/*"
                  className={`w-full px-3 py-2 border rounded-md ${
                    isDark ? 'bg-gray-800 text-white border-gray-700' : 'bg-white text-gray-900 border-gray-300'
                  }`}
                />
              </div>
            </>
          ) : (
            <div>
              <label htmlFor="youtubeUrl" className={`block mb-2 ${isDark ? 'text-white' : 'text-gray-700'}`}>YouTube Video URL</label>
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
                'Add Video'
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