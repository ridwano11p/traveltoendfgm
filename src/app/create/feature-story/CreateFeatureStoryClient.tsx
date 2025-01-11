"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useTheme } from '@/context/ThemeContext';
import { db, storage } from '@/lib/firebase/config';
import { collection, addDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { FeatureStoryFormData, FormState } from './types';

import FormInput from './components/FormInput';
import FormTextArea from './components/FormTextArea';
import TagInput from './components/TagInput';
import MediaInput from './components/MediaInput';
import SubmitButton from './components/SubmitButton';

export default function CreateFeatureStoryClient() {
  const { theme } = useTheme();
  const router = useRouter();
  const isDark = theme === 'dark';

  const [formData, setFormData] = useState<FeatureStoryFormData>({
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
        const imageRef = ref(storage, `feature_story_images/${Date.now()}_${formData.image.name}`);
        await uploadBytes(imageRef, formData.image);
        imageUrl = await getDownloadURL(imageRef);
      }

      if (formData.isYouTubeVideo) {
        youtubeId = extractYoutubeId(formData.youTubeUrl);
        videoUrl = formData.youTubeUrl;
      } else if (formData.video) {
        const videoRef = ref(storage, `feature_story_videos/${Date.now()}_${formData.video.name}`);
        await uploadBytes(videoRef, formData.video);
        videoUrl = await getDownloadURL(videoRef);
      }

      const featureStoryData = {
        title: formData.title.trim(),
        content: formData.content.trim(),
        author: formData.author.trim(),
        imageUrl,
        videoUrl,
        youtubeId,
        isYouTubeVideo:  formData.isYouTubeVideo,
        tags: formData.tags,
        createdAt: new Date(),
        updatedAt: new Date()
      };

      await addDoc(collection(db, 'featureStories'), featureStoryData);
      router.push('/');
    } catch (err) {
      console.error("Error creating feature story: ", err);
      setState({ loading: false, error: "Failed to create feature story. Please try again." });
    }
  };

  return (
    <div className={`min-h-screen py-12 ${isDark ? 'bg-gray-900' : 'bg-[#90d2dc]'}`}>
      <div className="max-w-4xl mx-auto px-4">
        <h1 className={`text-4xl font-bold mb-8 text-center ${isDark ? 'text-white' : 'text-gray-800'}`}>
          Create New Feature Story
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <FormInput
            id="title"
            label="Title"
            value={formData.title}
            onChange={(value) => setFormData(prev => ({ ...prev, title: value }))}
            required
            minLength={5}
            isDark={isDark}
          />

          <FormInput
            id="author"
            label="Author"
            value={formData.author}
            onChange={(value) => setFormData(prev => ({ ...prev, author: value }))}
            required
            minLength={2}
            isDark={isDark}
          />

          <FormTextArea
            id="content"
            label="Content"
            value={formData.content}
            onChange={(value) => setFormData(prev => ({ ...prev, content: value }))}
            required
            minLength={50}
            rows={10}
            isDark={isDark}
          />

          <MediaInput
            isYouTubeVideo={formData.isYouTubeVideo}
            youTubeUrl={formData.youTubeUrl}
            onYouTubeChange={(value) => setFormData(prev => ({ ...prev, youTubeUrl: value }))}
            onVideoChange={(file) => setFormData(prev => ({ ...prev, video: file }))}
            onImageChange={(file) => setFormData(prev => ({ ...prev, image: file }))}
            onToggleYouTube={() => setFormData(prev => ({ ...prev, isYouTubeVideo: !prev.isYouTubeVideo }))}
            isDark={isDark}
          />

          <TagInput
            tags={formData.tags}
            currentTag={formData.currentTag}
            onAddTag={handleAddTag}
            onRemoveTag={handleRemoveTag}
            onTagChange={(value) => setFormData(prev => ({ ...prev, currentTag: value }))}
            isDark={isDark}
          />

          <SubmitButton loading={state.loading} isDark={isDark} />
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
