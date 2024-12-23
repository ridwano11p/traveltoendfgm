"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useTheme } from '@/context/ThemeContext';
import { useAuth } from '@/context/AuthContext';
import { db } from '@/lib/firebase/config';
import { collection, query, orderBy, limit, getDocs, doc, updateDoc } from 'firebase/firestore';
import { FaSpinner } from 'react-icons/fa';

interface ContactInfo {
  id: string;
  email: string;
  phone: string;
  location: string;
  createdAt: Date;
  updatedAt: Date;
}

export default function EditContactInfo() {
  const { theme } = useTheme();
  const { user } = useAuth();
  const router = useRouter();
  const isDark = theme === 'dark';

  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [location, setLocation] = useState('');
  const [docId, setDocId] = useState('');
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!user) {
      router.push('/login');
    } else {
      fetchContactInfo();
    }
  }, [user, router]);

  const fetchContactInfo = async () => {
    try {
      const q = query(collection(db, 'siteContactInfo'), orderBy('createdAt', 'desc'), limit(1));
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        const doc = querySnapshot.docs[0];
        const data = doc.data() as Omit<ContactInfo, 'id'>;
        setEmail(data.email);
        setPhone(data.phone || '');
        setLocation(data.location || '');
        setDocId(doc.id);
      } else {
        router.push('/create/contact-info');
      }
    } catch (err) {
      console.error('Error fetching contact info: ', err);
      setError('Failed to load contact information. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const validateForm = (): boolean => {
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

    setUpdating(true);
    try {
      const contactInfoRef = doc(db, 'siteContactInfo', docId);
      await updateDoc(contactInfoRef, {
        email: email.trim(),
        phone: phone.trim(),
        location: location.trim(),
        updatedAt: new Date(),
      });
      router.push('/');
    } catch (err) {
      console.error('Error updating contact info: ', err);
      setError('An error occurred while updating contact information. Please try again.');
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${isDark ? 'bg-gray-900' : 'bg-[#90d2dc]'}`}>
        <FaSpinner className={`animate-spin text-4xl ${isDark ? 'text-white' : 'text-gray-800'}`} />
      </div>
    );
  }

  return (
    <div className={`min-h-screen py-12 ${isDark ? 'bg-gray-900' : 'bg-[#90d2dc]'}`}>
      <div className="max-w-2xl mx-auto px-4">
        <h2 className={`text-3xl font-bold mb-6 text-center ${isDark ? 'text-white' : 'text-gray-800'}`}>
          Edit Contact Information
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className={`block mb-2 font-medium ${isDark ? 'text-white' : 'text-gray-700'}`}>
              Email:
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className={`w-full p-3 border rounded-md ${
                isDark ? 'bg-gray-800 text-white border-gray-700' : 'bg-white text-gray-900 border-gray-300'
              } focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
          </div>
          <div>
            <label htmlFor="phone" className={`block mb-2 font-medium ${isDark ? 'text-white' : 'text-gray-700'}`}>
              Phone:
            </label>
            <input
              type="tel"
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              className={`w-full p-3 border rounded-md ${
                isDark ? 'bg-gray-800 text-white border-gray-700' : 'bg-white text-gray-900 border-gray-300'
              } focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
          </div>
          <div>
            <label htmlFor="location" className={`block mb-2 font-medium ${isDark ? 'text-white' : 'text-gray-700'}`}>
              Location:
            </label>
            <input
              type="text"
              id="location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              required
              className={`w-full p-3 border rounded-md ${
                isDark ? 'bg-gray-800 text-white border-gray-700' : 'bg-white text-gray-900 border-gray-300'
              } focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
          </div>
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
              disabled={updating}
              className={`px-4 py-2 rounded-md ${
                isDark
                  ? 'bg-blue-600 hover:bg-blue-700 text-white'
                  : 'bg-blue-500 hover:bg-blue-600 text-white'
              } transition duration-300 ${updating ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {updating ? (
                <FaSpinner className="animate-spin mx-auto" />
              ) : (
                'Update Contact Information'
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