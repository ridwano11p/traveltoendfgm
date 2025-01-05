"use client";

import { useTheme } from '@/context/ThemeContext';
import PDFCard from './components/PDFCard';
import { PDF } from './types';

interface Props {
  pdfs: PDF[];
}

export default function PDFClient({ pdfs }: Props) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <div className={`min-h-screen py-12 ${isDark ? 'bg-gray-900' : 'bg-[#90d2dc]'}`}>
      <div className="max-w-6xl mx-auto px-4">
        <h1 className={`text-4xl font-bold mb-8 text-center ${isDark ? 'text-white' : 'text-gray-800'}`}>
          Research and Reports
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pdfs.map((pdf) => (
            <PDFCard
              key={pdf.id}
              pdf={pdf}
              isDark={isDark}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
