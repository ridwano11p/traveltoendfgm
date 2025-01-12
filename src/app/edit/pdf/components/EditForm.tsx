"use client";

import { EditFormProps, MAX_PDF_SIZE } from '../types';
import { FaSpinner } from 'react-icons/fa';

export default function EditForm({
  pdf,
  onUpdate,
  onCancel,
  onFileChange,
  updating,
  isDark
}: EditFormProps) {
  const handlePdfChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > MAX_PDF_SIZE) {
        alert(`PDF file size should be less than ${MAX_PDF_SIZE / (1024 * 1024)}MB`);
        return;
      }
      if (file.type !== 'application/pdf') {
        alert("Please upload a valid PDF file.");
        return;
      }
      onFileChange(file);
    }
  };

  return (
    <form onSubmit={onUpdate} className="space-y-6">
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
          value={pdf.title}
          onChange={(e) => pdf.title = e.target.value}
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
          value={pdf.description}
          onChange={(e) => pdf.description = e.target.value}
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

      <div>
        <label
          htmlFor="pdf"
          className={`block mb-2 ${isDark ? 'text-white' : 'text-gray-700'}`}
        >
          New PDF File (Optional)
        </label>
        <input
          type="file"
          id="pdf"
          onChange={handlePdfChange}
          accept=".pdf"
          className={`w-full px-3 py-2 border rounded-md ${
            isDark
              ? 'bg-gray-800 text-white border-gray-700'
              : 'bg-white text-gray-900 border-gray-300'
          }`}
        />
      </div>

      <div className="flex justify-end space-x-4">
        <button
          type="button"
          onClick={onCancel}
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
            isDark ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'
          } text-white transition duration-300 ${updating ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          {updating ? <FaSpinner className="animate-spin mx-auto" /> : 'Update PDF'}
        </button>
      </div>
    </form>
  );
}