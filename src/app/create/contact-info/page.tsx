"use client";

import { useState, useEffect, useContext, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { collection, addDoc, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase/config';
import { ThemeContext } from '@/context/ThemeContext';
import { useAuth } from '@/context/AuthContext';
import { FaSpinner } from 'react-icons/fa';

interface ContactFormData {
  email: string;
  phone: string;
  location: string;
}

export default function CreateContactInfo() {
  const [formData, setFormData] = useState<ContactFormData>({
    email: '',
    phone: '',
    location: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const themeContext = useContext(ThemeContext);
  const { user } = useAuth();

  const isDarkMode = themeContext?.theme === "dark";

  const checkExistingContactInfo = useCallback(async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'siteContactInfo'));
      if (!querySnapshot.empty) {
        window.alert('Contact information already exists. Please use the edit page to update it.');
        router.push('/edit');
      }
    } catch (err) {
      console.error('Error checking existing contact info:', err);
      setError('Failed to check existing contact information.');
    }
  }, [router, setError]);

  useEffect(() => {
    if (!user) {
      router.push('/login');
      return;
    }
    checkExistingContactInfo();
  }, [user, router, checkExistingContactInfo]);

  const validateForm = (): boolean => {
    const { email, phone, location } = formData;

    if (!email.trim()) {
      setError('Email is required');
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Invalid email format');
      return false;
    }
    if (!phone.trim()) {
      setError('Phone number is required');
      return false;
    }
    if (!location.trim()) {
      setError('Location is required');
      return false;
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
      await addDoc(collection(db, 'siteContactInfo'), {
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        location: formData.location.trim(),
        createdAt: new Date(),
      });
      window.alert('Contact information created successfully!');
      router.push('/');
    } catch (err) {
      console.error('Error adding contact info: ', err);
      setError('An error occurred while creating contact information. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  return (
    <div className={`min-h-screen py-12 ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-[#90d2dc] text-gray-800'}`}>
      <div className="max-w-2xl mx-auto px-4">
        <h2 className="text-3xl font-bold mb-6 text-center">Create Contact Information</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block mb-2 font-medium">Email:</label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              className={`w-full p-3 border rounded-md ${
                isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-300'
              } focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
          </div>
          <div>
            <label htmlFor="phone" className="block mb-2 font-medium">Phone:</label>
            <input
              type="tel"
              id="phone"
              value={formData.phone}
              onChange={handleInputChange}
              required
              className={`w-full p-3 border rounded-md ${
                isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-300'
              } focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
          </div>
          <div>
            <label htmlFor="location" className="block mb-2 font-medium">Location:</label>
            <input
              type="text"
              id="location"
              value={formData.location}
              onChange={handleInputChange}
              required
              className={`w-full p-3 border rounded-md ${
                isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-300'
              } focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 px-4 rounded-md ${
              isDarkMode
                ? 'bg-blue-600 hover:bg-blue-700 text-white'
                : 'bg-blue-500 hover:bg-blue-600 text-white'
            } transition duration-300 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {loading ? (
              <FaSpinner className="animate-spin mx-auto" />
            ) : (
              'Create Contact Information'
            )}
          </button>
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