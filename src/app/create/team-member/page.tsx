"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useTheme } from '@/context/ThemeContext';
import { useAuth } from '@/context/AuthContext';
import { db, storage } from '@/lib/firebase/config';
import { collection, addDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { FaSpinner } from 'react-icons/fa';
import imageCompression from 'browser-image-compression';

const MAX_IMAGE_SIZE = 1 * 1024 * 1024; // 1MB

interface TeamMemberFormData {
  name: string;
  role: string;
  bio: string;
  image: File | null;
  linkedin: string;
  twitter: string;
  youtube: string;
  facebook: string;
}

interface SocialMediaUrls {
  linkedin: string;
  twitter: string;
  youtube: string;
  facebook: string;
}

export default function CreateTeamMember() {
  const { theme } = useTheme();
  const { user } = useAuth();
  const router = useRouter();

  const isDarkMode = theme === "dark";

  const [formData, setFormData] = useState<TeamMemberFormData>({
    name: '',
    role: '',
    bio: '',
    image: null,
    linkedin: '',
    twitter: '',
    youtube: '',
    facebook: ''
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
          maxWidthOrHeight: 800
        });
        setFormData(prev => ({ ...prev, image: compressedFile }));
        setError(null);
      } catch (err) {
        console.error("Error compressing image: ", err);
        setError("Failed to process image. Please try again.");
      }
    }
  };

  const isValidUrl = (url: string): boolean => {
    if (!url) return true; // Empty URLs are considered valid
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const validateForm = (): boolean => {
    const { name, role, bio, image, linkedin, twitter, youtube, facebook } = formData;

    if (name.trim().length < 2) {
      setError("Name must be at least 2 characters long.");
      return false;
    }
    if (role.trim().length < 2) {
      setError("Role must be at least 2 characters long.");
      return false;
    }
    if (bio.trim().length < 10) {
      setError("Bio must be at least 10 characters long.");
      return false;
    }
    if (!image) {
      setError("Please upload a profile image.");
      return false;
    }

    // Validate social media URLs if provided
    const socialUrls: SocialMediaUrls = { linkedin, twitter, youtube, facebook };
    for (const [platform, url] of Object.entries(socialUrls)) {
      if (url && !isValidUrl(url)) {
        setError(`Please enter a valid ${platform} URL.`);
        return false;
      }
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    if (!validateForm()) {
      return;
    }

    setLoading(true);
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
      setError("Failed to create team member. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`min-h-screen py-12 ${isDarkMode ? 'bg-gray-900' : 'bg-[#90d2dc]'}`}>
      <div className="max-w-4xl mx-auto px-4">
        <h1 className={`text-4xl font-bold mb-8 text-center ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
          Add New Team Member
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className={`block mb-2 ${isDarkMode ? 'text-white' : 'text-gray-700'}`}>Name</label>
            <input
              type="text"
              id="name"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              required
              minLength={2}
              className={`w-full px-3 py-2 border rounded-md ${
                isDarkMode ? 'bg-gray-800 text-white border-gray-700' : 'bg-white text-gray-900 border-gray-300'
              }`}
            />
          </div>
          <div>
            <label htmlFor="role" className={`block mb-2 ${isDarkMode ? 'text-white' : 'text-gray-700'}`}>Role</label>
            <input
              type="text"
              id="role"
              value={formData.role}
              onChange={(e) => setFormData(prev => ({ ...prev, role: e.target.value }))}
              required
              minLength={2}
              className={`w-full px-3 py-2 border rounded-md ${
                isDarkMode ? 'bg-gray-800 text-white border-gray-700' : 'bg-white text-gray-900 border-gray-300'
              }`}
            />
          </div>
          <div>
            <label htmlFor="bio" className={`block mb-2 ${isDarkMode ? 'text-white' : 'text-gray-700'}`}>Bio</label>
            <textarea
              id="bio"
              value={formData.bio}
              onChange={(e) => setFormData(prev => ({ ...prev, bio: e.target.value }))}
              required
              minLength={10}
              rows={5}
              className={`w-full px-3 py-2 border rounded-md ${
                isDarkMode ? 'bg-gray-800 text-white border-gray-700' : 'bg-white text-gray-900 border-gray-300'
              }`}
            />
          </div>
          <div>
            <label htmlFor="image" className={`block mb-2 ${isDarkMode ? 'text-white' : 'text-gray-700'}`}>Profile Image</label>
            <input
              type="file"
              id="image"
              onChange={handleImageChange}
              accept="image/*"
              required
              className={`w-full px-3 py-2 border rounded-md ${
                isDarkMode ? 'bg-gray-800 text-white border-gray-700' : 'bg-white text-gray-900 border-gray-300'
              }`}
            />
          </div>
          <div>
            <label htmlFor="linkedin" className={`block mb-2 ${isDarkMode ? 'text-white' : 'text-gray-700'}`}>LinkedIn URL</label>
            <input
              type="url"
              id="linkedin"
              value={formData.linkedin}
              onChange={(e) => setFormData(prev => ({ ...prev, linkedin: e.target.value }))}
              className={`w-full px-3 py-2 border rounded-md ${
                isDarkMode ? 'bg-gray-800 text-white border-gray-700' : 'bg-white text-gray-900 border-gray-300'
              }`}
            />
          </div>
          <div>
            <label htmlFor="twitter" className={`block mb-2 ${isDarkMode ? 'text-white' : 'text-gray-700'}`}>Twitter URL</label>
            <input
              type="url"
              id="twitter"
              value={formData.twitter}
              onChange={(e) => setFormData(prev => ({ ...prev, twitter: e.target.value }))}
              className={`w-full px-3 py-2 border rounded-md ${
                isDarkMode ? 'bg-gray-800 text-white border-gray-700' : 'bg-white text-gray-900 border-gray-300'
              }`}
            />
          </div>
          <div>
            <label htmlFor="youtube" className={`block mb-2 ${isDarkMode ? 'text-white' : 'text-gray-700'}`}>YouTube URL</label>
            <input
              type="url"
              id="youtube"
              value={formData.youtube}
              onChange={(e) => setFormData(prev => ({ ...prev, youtube: e.target.value }))}
              className={`w-full px-3 py-2 border rounded-md ${
                isDarkMode ? 'bg-gray-800 text-white border-gray-700' : 'bg-white text-gray-900 border-gray-300'
              }`}
            />
          </div>
          <div>
            <label htmlFor="facebook" className={`block mb-2 ${isDarkMode ? 'text-white' : 'text-gray-700'}`}>Facebook URL</label>
            <input
              type="url"
              id="facebook"
              value={formData.facebook}
              onChange={(e) => setFormData(prev => ({ ...prev, facebook: e.target.value }))}
              className={`w-full px-3 py-2 border rounded-md ${
                isDarkMode ? 'bg-gray-800 text-white border-gray-700' : 'bg-white text-gray-900 border-gray-300'
              }`}
            />
          </div>
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => router.back()}
              className={`px-4 py-2 rounded-md ${
                isDarkMode ? 'bg-gray-600 hover:bg-gray-700' : 'bg-gray-200 hover:bg-gray-300'
              } text-gray-800 transition duration-300`}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className={`px-4 py-2 rounded-md ${
                isDarkMode
                  ? 'bg-blue-600 hover:bg-blue-700 text-white'
                  : 'bg-blue-500 hover:bg-blue-600 text-white'
              } transition duration-300 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {loading ? (
                <FaSpinner className="animate-spin mx-auto" />
              ) : (
                'Add Team Member'
              )}
            </button>
          </div>
        </form>
        {error && (
          <div className={`mt-4 p-4 rounded-md ${isDarkMode ? 'bg-red-800 text-red-100' : 'bg-red-100 text-red-800'}`}>
            {error}
          </div>
        )}
      </div>
    </div>
  );
}