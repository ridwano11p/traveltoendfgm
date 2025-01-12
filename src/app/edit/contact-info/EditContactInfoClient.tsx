"use client";

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useTheme } from '@/context/ThemeContext';
import { db } from '@/lib/firebase/config';
import { collection, query, orderBy, limit, getDocs, doc, updateDoc } from 'firebase/firestore';
import { FaSpinner } from 'react-icons/fa';
import { ContactFormData, FormState } from './types';
import ContactForm from './components/ContactForm';
import FormButtons from './components/FormButtons';

export default function EditContactInfoClient() {
  const { theme } = useTheme();
  const router = useRouter();
  const isDark = theme === 'dark';

  const [formData, setFormData] = useState<ContactFormData>({
    email: '',
    phone: '',
    location: '',
  });

  const [state, setState] = useState<FormState>({
    loading: true,
    updating: false,
    error: null,
    docId: '',
  });

  const fetchContactInfo = useCallback(async () => {
    try {
      const q = query(
        collection(db, 'siteContactInfo'),
        orderBy('createdAt', 'desc'),
        limit(1)
      );
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const doc = querySnapshot.docs[0];
        const data = doc.data();
        setFormData({
          email: data.email,
          phone: data.phone || '',
          location: data.location || '',
        });
        setState(prev => ({ ...prev, docId: doc.id }));
      } else {
        router.push('/create/contact-info');
      }
    } catch {
      setState(prev => ({
        ...prev,
        error: 'Failed to load contact information. Please try again.'
      }));
    } finally {
      setState(prev => ({ ...prev, loading: false }));
    }
  }, [router, setFormData, setState]);

  useEffect(() => {
    void fetchContactInfo();
  }, [fetchContactInfo]);

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

    setState(prev => ({ ...prev, updating: true }));
    try {
      const contactInfoRef = doc(db, 'siteContactInfo', state.docId);
      await updateDoc(contactInfoRef, {
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        location: formData.location.trim(),
        updatedAt: new Date(),
      });
      router.push('/');
    } catch {
      setState(prev => ({
        ...prev,
        error: 'An error occurred while updating contact information. Please try again.'
      }));
    } finally {
      setState(prev => ({ ...prev, updating: false }));
    }
  };

  if (state.loading) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${
        isDark ? 'bg-gray-900 text-white' : 'bg-[#90d2dc] text-gray-800'
      }`}>
        <FaSpinner className="animate-spin text-4xl" />
      </div>
    );
  }

  return (
    <div className={`min-h-screen py-12 ${isDark ? 'bg-gray-900 text-white' : 'bg-[#90d2dc] text-gray-800'}`}>
      <div className="max-w-2xl mx-auto px-4">
        <h2 className="text-3xl font-bold mb-6 text-center">Edit Contact Information</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <ContactForm
            formData={formData}
            onChange={(field, value) => setFormData(prev => ({ ...prev, [field]: value }))}
            isDark={isDark}
          />

          <FormButtons
            updating={state.updating}
            onCancel={() => router.back()}
            isDark={isDark}
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