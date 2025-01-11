"use client";

import { useState } from 'react';
import { PDFUploadProps } from '../types';
import { MAX_PDF_SIZE } from '../types';

export default function PDFUpload({ onFileChange, isDark }: PDFUploadProps) {
  const [error, setError] = useState<string | null>(null);

  const handlePdfChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setError(null);

    if (file) {
      if (file.size > MAX_PDF_SIZE) {
        setError(`PDF file size should be less than ${MAX_PDF_SIZE / (1024 * 1024)}MB`);
        onFileChange(null);
        return;
      }
      if (file.type !== 'application/pdf') {
        setError("Please upload a valid PDF file.");
        onFileChange(null);
        return;
      }
      onFileChange(file);
    }
  };

  return (
    <div>
      <label
        htmlFor="pdfFile"
        className={`block mb-2 ${isDark ? 'text-white' : 'text-gray-700'}`}
      >
        PDF File
      </label>
      <input
        type="file"
        id="pdfFile"
        onChange={handlePdfChange}
        accept=".pdf"
        required
        className={`w-full px-3 py-2 border rounded-md ${
          isDark
            ? 'bg-gray-800 text-white border-gray-700'
            : 'bg-white text-gray-900 border-gray-300'
        }`}
      />
      {error && (
        <p className={`mt-2 text-sm ${isDark ? 'text-red-400' : 'text-red-600'}`}>
          {error}
        </p>
      )}
    </div>
  );
}
