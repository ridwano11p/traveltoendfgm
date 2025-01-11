"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useTheme } from '@/context/ThemeContext';
import { db, storage } from '@/lib/firebase/config';
import { collection, addDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { FaSpinner, FaTimes } from 'react-icons/fa';
import { BlogFormData, FormState } from './types';

export default function CreateBlogClient() {
  const { theme } = useTheme();
  const router = useRouter();
  const isDark = theme === 'dark';

  const [formData, setFormData] = useState<BlogFormData>({
    title: '',
    content: '',
    author: '',
    image: null,
    video: null,
    isYouTubeVideo: false,
    youTubeUrl: '',
    tags: [],
    currentTag: '',
  });

  const [state, setState] = useState<FormState>({
    loading: false,
    error: null,
  });

  const validateYouTubeUrl = (url: string) => {
    const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/(watch\?v=)?([a-zA-Z0-9_-]{11})$/;
    return youtubeRegex.test(url);
  };

  const extractYoutubeId = (url: string) => {
    const match = url.match(/(?:https?:\/\/)?(?:www\.)?(?:youtube\.com|youtu\.be)\/(?:watch\?v=)?([a-zA-Z0-9_-]{11})/);
    return match ? match[1] : null;
  };

  const handleAddTag = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (formData.currentTag.trim() && !formData.tags.includes(formData.currentTag.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, prev.currentTag.trim()],
        currentTag: '',
      }));
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove),
    }));
  };

  const validateForm = (): boolean => {
    if (formData.title.trim().length < 5) {
      setState(prev => ({ ...prev, error: "Title must be at least 5 characters long." }));
      return false;
    }

    if (formData.content.trim().length < 50) {
      setState(prev => ({ ...prev, error: "Content must be at least 50 characters long." }));
      return false;
    }

    if (formData.author.trim().length < 2) {
      setState(prev => ({ ...prev, error: "Author name must be at least 2 characters long." }));
      return false;
    }

    if (formData.isYouTubeVideo && !validateYouTubeUrl(formData.youTubeUrl)) {
      setState(prev => ({ ...prev, error: "Please enter a valid YouTube URL." }));
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
      let videoUrl = null;
      let youtubeId = null;

      if (formData.image) {
        const imageRef = ref(storage, `blog_images/${Date.now()}_${formData.image.name}`);
        await uploadBytes(imageRef, formData.image);
        imageUrl = await getDownloadURL(imageRef);
      }

      if (formData.isYouTubeVideo) {
        youtubeId = extractYoutubeId(formData.youTubeUrl);
        videoUrl = formData.youTubeUrl;
      } else if (formData.video) {
        const videoRef = ref(storage, `blog_videos/${Date.now()}_${formData.video.name}`);
        await uploadBytes(videoRef, formData.video);
        videoUrl = await getDownloadURL(videoRef);
      }

      const blogData = {
        title: formData.title.trim(),
        content: formData.content.trim(),
        author: formData.author.trim(),
        imageUrl,
        videoUrl,
        youtubeId,
        isYouTubeVideo: formData.isYouTubeVideo,
        tags: formData.tags,
        createdAt: new Date(),
        updatedAt: new Date()
      };

      await addDoc(collection(db, 'blogs'), blogData);
      router.push('/impact-stories');
    } catch (err) {
      console.error("Error creating blog post: ", err);
      setState({ loading: false, error: "Failed to create blog post. Please try again." });
    }
  };

  return (
    <div className={`min-h-screen py-12 ${isDark ? 'bg-gray-900' : 'bg-[#90d2dc]'}`}>
      <div className="max-w-4xl mx-auto px-4">
        <h1 className={`text-4xl font-bold mb-8 text-center ${isDark ? 'text-white' : 'text-gray-800'}`}>
          Create New Blog Post
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title Input */}
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
              minLength={5}
              className={`w-full px-3 py-2 border rounded-md ${
                isDark ? 'bg-gray-800 text-white border-gray-700' : 'bg-white text-gray-900 border-gray-300'
              }`}
            />
          </div>

          {/* Author Input */}
          <div>
            <label htmlFor="author" className={`block mb-2 ${isDark ? 'text-white' : 'text-gray-700'}`}>
              Author
            </label>
            <input
              type="text"
              id="author"
              value={formData.author}
              onChange={(e) => setFormData(prev => ({ ...prev, author: e.target.value }))}
              required
              minLength={2}
              className={`w-full px-3 py-2 border rounded-md ${
                isDark ? 'bg-gray-800 text-white border-gray-700' : 'bg-white text-gray-900 border-gray-300'
              }`}
            />
          </div>

          {/* Content Input */}
          <div>
            <label htmlFor="content" className={`block mb-2 ${isDark ? 'text-white' : 'text-gray-700'}`}>
              Content
            </label>
            <textarea
              id="content"
              value={formData.content}
              onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
              required
              minLength={50}
              rows={10}
              className={`w-full px-3 py-2 border rounded-md ${
                isDark ? 'bg-gray-800 text-white border-gray-700' : 'bg-white text-gray-900 border-gray-300'
              }`}
            />
          </div>

          {/* Image Input */}
          <div>
            <label htmlFor="image" className={`block mb-2 ${isDark ? 'text-white' : 'text-gray-700'}`}>
              Image
            </label>
            <input
              type="file"
              id="image"
              onChange={(e) => setFormData(prev => ({
                ...prev,
                image: e.target.files ? e.target.files[0] : null
              }))}
              accept="image/*"
              className={`w-full px-3 py-2 border rounded-md ${
                isDark ? 'bg-gray-800 text-white border-gray-700' : 'bg-white text-gray-900 border-gray-300'
              }`}
            />
          </div>

          {/* Video Input */}
          <div>
            <label className={`flex items-center mb-2 ${isDark ? 'text-white' : 'text-gray-700'}`}>
              <input
                type="checkbox"
                checked={formData.isYouTubeVideo}
                onChange={() => setFormData(prev => ({ ...prev, isYouTubeVideo: !prev.isYouTubeVideo }))}
                className="mr-2"
              />
              YouTube Video
            </label>
            {formData.isYouTubeVideo ? (
              <input
                type="url"
                value={formData.youTubeUrl}
                onChange={(e) => setFormData(prev => ({ ...prev, youTubeUrl: e.target.value }))}
                placeholder="Enter YouTube URL"
                className={`w-full px-3 py-2 border rounded-md ${
                  isDark ? 'bg-gray-800 text-white border-gray-700' : 'bg-white text-gray-900 border-gray-300'
                }`}
              />
            ) : (
              <input
                type="file"
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  video: e.target.files ? e.target.files[0] : null
                }))}
                accept="video/*"
                className={`w-full px-3 py-2 border rounded-md ${
                  isDark ? 'bg-gray-800 text-white border-gray-700' : 'bg-white text-gray-900 border-gray-300'
                }`}
              />
            )}
          </div>

          {/* Tags Input */}
          <div>
            <label htmlFor="tags" className={`block mb-2 ${isDark ? 'text-white' : 'text-gray-700'}`}>
              Tags
            </label>
            <div className="flex flex-wrap mb-2">
              {formData.tags.map((tag, index) => (
                <span
                  key={index}
                  className={`${
                    isDark ? 'bg-blue-600 text-white' : 'bg-blue-100 text-blue-800'
                  } px-2 py-1 rounded-full text-sm font-semibold mr-2 mb-2 flex items-center`}
                >
                  {tag}
                  <button
                    type="button"
                    onClick={() => handleRemoveTag(tag)}
                    className="ml-1 focus:outline-none"
                  >
                    <FaTimes className="h-3 w-3" />
                  </button>
                </span>
              ))}
            </div>
            <div className="flex">
              <input
                type="text"
                value={formData.currentTag}
                onChange={(e) => setFormData(prev => ({ ...prev, currentTag: e.target.value }))}
                placeholder="Add a tag"
                className={`flex-grow px-3 py-2 border rounded-l-md ${
                  isDark ? 'bg-gray-800 text-white border-gray-700' : 'bg-white text-gray-900 border-gray-300'
                }`}
              />
              <button
                type="button"
                onClick={handleAddTag}
                className={`px-4 py-2 rounded-r-md ${
                  isDark ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'
                } text-white`}
              >
                Add Tag
              </button>
            </div>
          </div>

          {/* Submit Button */}
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
              'Create Blog Post'
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
