"use client";

import { useState, useContext, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ThemeContext } from '@/context/ThemeContext';
import { useAuth } from '@/context/AuthContext';
import { db, storage } from '@/lib/firebase/config';
import { collection, addDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { FaSpinner } from 'react-icons/fa';

const MAX_PDF_SIZE = 10 * 1024 * 1024; // 10MB

interface PDFFormData {
  title: string;
  description: string;
  pdfFile: File | null;
}

export default function CreatePDF() {
  const { darkMode } = useContext(ThemeContext);
  const { user } = useAuth();
  const router = useRouter();

  const [formData, setFormData] = useState<PDFFormData>({
    title: '',
    description: '',
    pdfFile: null
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!user) {
      router.push('/login');
    }
  }, [user, router]);

  const handlePdfChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > MAX_PDF_SIZE) {
        setError(`PDF file size should be less than ${MAX_PDF_SIZE / (1024 * 1024)}MB`);
        return;
      }
      if (file.type !== 'application/pdf') {
        setError("Please upload a valid PDF file.");
        return;
      }
      setFormData(prev => ({ ...prev, pdfFile: file }));
    }
  };

  const validateForm = (): boolean => {
    const { title, description, pdfFile } = formData;

    if (title.trim().length < 3) {
      setError("Title must be at least 3 characters long.");
      return false;
    }
    if (description.trim().length < 10) {
      setError("Description must be at least 10 characters long.");
      return false;
    }
    if (!pdfFile) {
      setError("Please select a PDF file to upload.");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (!validateForm()) {
      setLoading(false);
      return;
    }

    try {
      const { title, description, pdfFile } = formData;
      const fileName = `${Date.now()}_${pdfFile!.name}`;
      const pdfRef = ref(storage, `pdfs/${fileName}`);
      await uploadBytes(pdfRef, pdfFile!);
      const pdfUrl = await getDownloadURL(pdfRef);

      const pdfData = {
        title: title.trim(),
        description: description.trim(),
        pdfUrl,
        fileName,
        createdAt: new Date(),
        updatedAt: new Date()
      };

      await addDoc(collection(db, 'pdfs'), pdfData);
      router.push('/research/pdfs');
    } catch (err) {
      console.error("Error creating PDF: ", err);
      setError("Failed to upload PDF. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`min-h-screen py-12 ${darkMode ? 'bg-gray-900' : 'bg-[#90d2dc]'}`}>
      <div className="max-w-4xl mx-auto px-4">
        <h1 className={`text-4xl font-bold mb-8 text-center ${darkMode ? 'text-white' : 'text-gray-800'}`}>
          Upload New PDF
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="title" className={`block mb-2 ${darkMode ? 'text-white' : 'text-gray-700'}`}>Title</label>
            <input
              type="text"
              id="title"
              value={formData.title}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              required
              minLength={3}
              className={`w-full px-3 py-2 border rounded-md ${
                darkMode ? 'bg-gray-800 text-white border-gray-700' : 'bg-white text-gray-900 border-gray-300'
              }`}
            />
          </div>
          <div>
            <label htmlFor="description" className={`block mb-2 ${darkMode ? 'text-white' : 'text-gray-700'}`}>Description</label>
            <textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              required
              minLength={10}
              rows={4}
              className={`w-full px-3 py-2 border rounded-md ${
                darkMode ? 'bg-gray-800 text-white border-gray-700' : 'bg-white text-gray-900 border-gray-300'
              }`}
            />
          </div>
          <div>
            <label htmlFor="pdfFile" className={`block mb-2 ${darkMode ? 'text-white' : 'text-gray-700'}`}>PDF File</label>
            <input
              type="file"
              id="pdfFile"
              onChange={handlePdfChange}
              accept=".pdf"
              required
              className={`w-full px-3 py-2 border rounded-md ${
                darkMode ? 'bg-gray-800 text-white border-gray-700' : 'bg-white text-gray-900 border-gray-300'
              }`}
            />
          </div>
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => router.back()}
              className={`px-4 py-2 rounded-md ${
                darkMode ? 'bg-gray-600 hover:bg-gray-700' : 'bg-gray-200 hover:bg-gray-300'
              } text-gray-800 transition duration-300`}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className={`px-4 py-2 rounded-md ${
                darkMode
                  ? 'bg-blue-600 hover:bg-blue-700 text-white'
                  : 'bg-blue-500 hover:bg-blue-600 text-white'
              } transition duration-300 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {loading ? (
                <FaSpinner className="animate-spin mx-auto" />
              ) : (
                'Upload PDF'
              )}
            </button>
          </div>
        </form>
        {error && (
          <div className={`mt-4 p-4 rounded-md ${darkMode ? 'bg-red-800 text-red-100' : 'bg-red-100 text-red-800'}`}>
            {error}
          </div>
        )}
      </div>
    </div>
  );
}