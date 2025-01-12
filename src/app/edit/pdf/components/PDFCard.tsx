"use client";

import { PDFCardProps } from '../types';
import { FaFilePdf, FaEdit, FaTrash } from 'react-icons/fa';

export default function PDFCard({ pdf, onEdit, onDelete, isDark }: PDFCardProps) {
  return (
    <div className={`p-6 rounded-lg shadow-md ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
      <div className="flex items-center mb-4">
        <FaFilePdf className={`text-4xl mr-4 ${isDark ? 'text-red-400' : 'text-red-600'}`} />
        <h2 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-800'}`}>
          {pdf.title}
        </h2>
      </div>

      <p className={`mb-4 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
        {pdf.description}
      </p>

      <p className={`mb-4 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
        File: {pdf.fileName ? pdf.fileName.replace(/^\d+_/, '') : 'No file name available'}
      </p>

      <div className="flex justify-center space-x-4">
        <button
          onClick={() => onEdit(pdf)}
          className={`px-4 py-2 rounded-md ${
            isDark ? 'bg-green-600 hover:bg-green-700' : 'bg-green-500 hover:bg-green-600'
          } text-white transition duration-300 flex items-center`}
        >
          <FaEdit className="mr-2" /> Edit
        </button>

        <button
          onClick={() => onDelete(pdf.id)}
          className={`px-4 py-2 rounded-md ${
            isDark ? 'bg-red-600 hover:bg-red-700' : 'bg-red-500 hover:bg-red-600'
          } text-white transition duration-300 flex items-center`}
        >
          <FaTrash className="mr-2" /> Delete
        </button>
      </div>
    </div>
  );
}