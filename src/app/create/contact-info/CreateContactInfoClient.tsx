"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useTheme } from '@/context/ThemeContext';
import { db } from '@/lib/firebase/config';
import { collection, addDoc, getDocs } from 'firebase/firestore';
import { FaSpinner } from 'react-icons/fa';
import { ContactFormData, FormState } from './types';

export default function CreateContactInfoClient() {
  const { theme } = useTheme();
  const router = useRouter();
  const isDark = theme === 'dark';

  const [formData, setFormData] = useState<ContactFormData>({
    email: '',
    phone: '',
    location: '',
  });

  const [state, setState] = useState<FormState>({
    loading: false,
    error: null,
  });

  useEffect(() => {
    const checkExistingContactInfo = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'siteContactInfo'));
        if (!querySnapshot.empty) {
          alert('Contact information already exists. Please use the edit page to update it.');
          router.push('/edit');
        }
      } catch (error) {
        console.error('Error checking existing contact info:', error);
      }
    };

    checkExistingContactInfo();
  }, [router]);

  const validateForm = (): boolean => {
    if (!formData.email.trim()) {
      setState(prev => ({ ...prev, error: 'Email is required' }));
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      setState(prev => ({ ...prev, error: 'Invalid email format' }));
      return false;
    }
    if (!formData.phone.trim()) {
      setState(prev => ({ ...prev, error: 'Phone number is required' }));
      return false;
    }
    if (!formData.location.trim()) {
      setState(prev => ({ ...prev, error: 'Location is required' }));
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setState(prev => ({ ...prev, error: null }));

    if (!validateForm()) {
      return;
    }

    setState(prev => ({ ...prev, loading: true }));
    try {
      await addDoc(collection(db, 'siteContactInfo'), {
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        location: formData.location.trim(),
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      alert('Contact information created successfully!');
      router.push('/');
    } catch (error) {
      console.error('Error adding contact info: ', error);
      setState(prev => ({
        ...prev,
        error: 'An error occurred while creating contact information. Please try again.'
      }));
    } finally {
      setState(prev => ({ ...prev, loading: false }));
    }
  };

  return (
    <div className={`min-h-screen py-12 ${isDark ? 'bg-gray-900 text-white' : 'bg-[#90d2dc] text-gray-800'}`}>
      <div className="max-w-2xl mx-auto px-4">
        <h2 className="text-3xl font-bold mb-6 text-center">Create Contact Information</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block mb-2 font-medium">Email:</label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
              required
              className={`w-full p-3 border rounded-md ${
                isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-300'
              } focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
          </div>

          <div>
            <label htmlFor="phone" className="block mb-2 font-medium">Phone:</label>
            <input
              type="tel"
              id="phone"
              value={formData.phone}
              onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
              required
              className={`w-full p-3 border rounded-md ${
                isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-300'
              } focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
          </div>

          <div>
            <label htmlFor="location" className="block mb-2 font-medium">Location:</label>
            <input
              type="text"
              id="location"
              value={formData.location}
              onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
              required
              className={`w-full p-3 border rounded-md ${
                isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-300'
              } focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
          </div>

          <button
            type="submit"
            disabled={state.loading}
            className={`w-full py-3 px-4 rounded-md ${
              isDark
                ? 'bg-blue-600 hover:bg-blue-700 text-white'
                : 'bg-blue-500 hover:bg-blue-600 text-white'
            } transition duration-300 ${state.loading ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {state.loading ? (
              <FaSpinner className="animate-spin mx-auto" />
            ) : (
              'Create Contact Information'
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
