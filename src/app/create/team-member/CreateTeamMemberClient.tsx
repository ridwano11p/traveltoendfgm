"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useTheme } from '@/context/ThemeContext';
import { db, storage } from '@/lib/firebase/config';
import { collection, addDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { TeamMemberFormData, FormState } from './types';
import ImageUpload from './components/ImageUpload';
import SocialMediaInputs from './components/SocialMediaInputs';
import FormButtons from './components/FormButtons';

export default function CreateTeamMemberClient() {
  const { theme } = useTheme();
  const router = useRouter();
  const isDark = theme === 'dark';

  const [formData, setFormData] = useState<TeamMemberFormData>({
    name: '',
    role: '',
    bio: '',
    image: null,
    linkedin: '',
    twitter: '',
    youtube: '',
    facebook: '',
  });

  const [state, setState] = useState<FormState>({
    loading: false,
    error: null,
  });

  const isValidUrl = (url: string): boolean => {
    if (!url) return true;
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const validateForm = (): boolean => {
    if (formData.name.trim().length < 2) {
      setState(prev => ({ ...prev, error: "Name must be at least 2 characters long." }));
      return false;
    }
    if (formData.role.trim().length < 2) {
      setState(prev => ({ ...prev, error: "Role must be at least 2 characters long." }));
      return false;
    }
    if (formData.bio.trim().length < 10) {
      setState(prev => ({ ...prev, error: "Bio must be at least 10 characters long." }));
      return false;
    }
    if (!formData.image) {
      setState(prev => ({ ...prev, error: "Please upload a profile image." }));
      return false;
    }

    const socialUrls = [
      { url: formData.linkedin, name: 'LinkedIn' },
      { url: formData.twitter, name: 'Twitter' },
      { url: formData.youtube, name: 'YouTube' },
      { url: formData.facebook, name: 'Facebook' },
    ];

    for (const { url, name } of socialUrls) {
      if (url && !isValidUrl(url)) {
        setState(prev => ({ ...prev, error: `Please enter a valid ${name} URL.` }));
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
      let imageUrl = null;

      if (formData.image) {
        const fileName = `${Date.now()}_${formData.image.name}`;
        const imageRef = ref(storage, `team_member_images/${fileName}`);
        await uploadBytes(imageRef, formData.image);
        imageUrl = await getDownloadURL(imageRef);
      }

      const teamMemberData = {
        name: formData.name.trim(),
        role: formData.role.trim(),
        bio: formData.bio.trim(),
        imageUrl,
        linkedin: formData.linkedin.trim(),
        twitter: formData.twitter.trim(),
        youtube: formData.youtube.trim(),
        facebook: formData.facebook.trim(),
        createdAt: new Date(),
        updatedAt: new Date()
      };

      await addDoc(collection(db, 'team_members'), teamMemberData);
      router.push('/about/who-we-are');
    } catch (err) {
      console.error("Error creating team member: ", err);
      setState({
        loading: false,
        error: "Failed to create team member. Please try again."
      });
    }
  };

  return (
    <div className={`min-h-screen py-12 ${isDark ? 'bg-gray-900' : 'bg-[#90d2dc]'}`}>
      <div className="max-w-4xl mx-auto px-4">
        <h1 className={`text-4xl font-bold mb-8 text-center ${isDark ? 'text-white' : 'text-gray-800'}`}>
          Add New Team Member
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <div>
            <label
              htmlFor="name"
              className={`block mb-2 ${isDark ? 'text-white' : 'text-gray-700'}`}
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              required
              minLength={2}
              className={`w-full px-3 py-2 border rounded-md ${
                isDark
                  ? 'bg-gray-800 text-white border-gray-700'
                  : 'bg-white text-gray-900 border-gray-300'
              }`}
            />
          </div>

          <div>
            <label
              htmlFor="role"
              className={`block mb-2 ${isDark ? 'text-white' : 'text-gray-700'}`}
            >
              Role
            </label>
            <input
              type="text"
              id="role"
              value={formData.role}
              onChange={(e) => setFormData(prev => ({ ...prev, role: e.target.value }))}
              required
              minLength={2}
              className={`w-full px-3 py-2 border rounded-md ${
                isDark
                  ? 'bg-gray-800 text-white border-gray-700'
                  : 'bg-white text-gray-900 border-gray-300'
              }`}
            />
          </div>

          <div>
            <label
              htmlFor="bio"
              className={`block mb-2 ${isDark ? 'text-white' : 'text-gray-700'}`}
            >
              Bio
            </label>
            <textarea
              id="bio"
              value={formData.bio}
              onChange={(e) => setFormData(prev => ({ ...prev, bio: e.target.value }))}
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

          <ImageUpload
            onFileChange={(file) => setFormData(prev => ({ ...prev, image: file }))}
            isDark={isDark}
            error={state.error}
          />

          <SocialMediaInputs
            formData={formData}
            onChange={(field, value) => setFormData(prev => ({ ...prev, [field]: value }))}
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
