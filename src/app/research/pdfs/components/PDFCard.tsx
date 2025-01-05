"use client";

import { FaFilePdf, FaDownload } from 'react-icons/fa';
import { PDF } from '../types';

interface Props {
  pdf: PDF;
  isDark: boolean;
}

export default function PDFCard({ pdf, isDark }: Props) {
  const handleViewPDF = () => {
    window.open(pdf.pdfUrl, '_blank');
  };

  return (
    <div className={`rounded-lg shadow-md overflow-hidden ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
      <div className="p-4">
        <div className="flex items-center mb-4">
          <FaFilePdf className={`text-4xl mr-4 ${isDark ? 'text-red-400' : 'text-red-600'}`} />
          <h3 className={`text-xl font-semibold ${isDark ? 'text-white' : 'text-gray-800'}`}>
            {pdf.title}
          </h3>
        </div>
        <div
          className={`text-sm mb-4 ${isDark ? 'text-gray-300' : 'text-gray-600'} whitespace-pre-line`}
          dangerouslySetInnerHTML={{ __html: pdf.description }}
        />
        <button
          onClick={handleViewPDF}
          className={`inline-flex items-center px-4 py-2 rounded ${
            isDark ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'
          } text-white transition duration-300`}
        >
          <FaDownload className="mr-2" />
          Download PDF
        </button>
      </div>
    </div>
  );
}
