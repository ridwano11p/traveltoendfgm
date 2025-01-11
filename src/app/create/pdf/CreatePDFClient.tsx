"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useTheme } from '@/context/ThemeContext';
import { db, storage } from '@/lib/firebase/config';
import { collection, addDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { PDFFormData, FormState } from './types';
import PDFUpload from './components/PDFUpload';
import FormButtons from './components/FormButtons';

export default function CreatePDFClient() {
  const { theme } = useTheme();
  const router = useRouter();
  const isDark = theme === 'dark';

  const [formData, setFormData] = useState<PDFFormData>({
    title: '',
    description: '',
    pdfFile: null,
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
    if (!formData.pdfFile) {
      setState(prev => ({ ...prev, error: "Please select a PDF file to upload." }));
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
      const fileName = `${Date.now()}_${formData.pdfFile!.name}`;
      const pdfRef = ref(storage, `pdfs/${fileName}`);
      await uploadBytes(pdfRef, formData.pdfFile!);
      const pdfUrl = await getDownloadURL(pdfRef);

      const pdfData = {
        title: formData.title.trim(),
        description: formData.description.trim(),
        pdfUrl,
        fileName,
        createdAt: new Date(),
        updatedAt: new Date()
      };

      await addDoc(collection(db, 'pdfs'), pdfData);
      router.push('/research/pdfs');
    } catch (err) {
      console.error("Error creating PDF: ", err);
      setState({
        loading: false,
        error: "Failed to upload PDF. Please try again."
      });
    }
  };

  return (
    <div className={`min-h-screen py-12 ${isDark ? 'bg-gray-900' : 'bg-[#90d2dc]'}`}>
      <div className="max-w-4xl mx-auto px-4">
        <h1 className={`text-4xl font-bold mb-8 text-center ${isDark ? 'text-white' : 'text-gray-800'}`}>
          Upload New PDF
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
              rows={4}
              className={`w-full px-3 py-2 border rounded-md ${
                isDark
                  ? 'bg-gray-800 text-white border-gray-700'
                  : 'bg-white text-gray-900 border-gray-300'
              }`}
            />
          </div>

          <PDFUpload
            onFileChange={(file) => setFormData(prev => ({ ...prev, pdfFile: file }))}
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
