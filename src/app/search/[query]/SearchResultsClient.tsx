"use client";

import { useState } from 'react';
import { useTheme } from '@/context/ThemeContext';
import { useRouter } from 'next/navigation';
import { AnimatePresence } from 'framer-motion';
import { FaSpinner } from 'react-icons/fa';
import { SearchResult } from '../types';
import BlogCard from '../components/results/BlogCard';
import VideoCard from '../components/results/VideoCard';
import PhotoCard from '../components/results/PhotoCard';
import PDFCard from '../components/results/PDFCard';
import TeamMemberCard from '../components/results/TeamMemberCard';
import PhotoModal from '../components/results/PhotoModal';
import TeamMemberModal from '../components/results/TeamMemberModal';

interface Props {
  results: SearchResult[];
  searchTerm: string;
  error?: string;
}

export default function SearchResultsClient({ results, searchTerm, error }: Props) {
  const { theme } = useTheme();
  const router = useRouter();
  const isDark = theme === 'dark';

  const [selectedPhoto, setSelectedPhoto] = useState<any>(null);
  const [selectedMember, setSelectedMember] = useState<any>(null);

  const handleTagClick = (tag: string) => {
    router.push(`/search/${encodeURIComponent(tag)}`);
  };

  const renderResultItem = (item: SearchResult) => {
    switch (item.type) {
      case 'blogs':
      case 'featureStories':
        return (
          <BlogCard
            blog={item}
            isDark={isDark}
            onTagClick={handleTagClick}
          />
        );
      case 'videos':
        return (
          <VideoCard
            video={item}
            isDark={isDark}
          />
        );
      case 'photos':
        return (
          <PhotoCard
            photo={item}
            isDark={isDark}
            onClick={setSelectedPhoto}
          />
        );
      case 'pdfs':
        return (
          <PDFCard
            pdf={item}
            isDark={isDark}
          />
        );
      case 'team_members':
        return (
          <TeamMemberCard
            member={item}
            isDark={isDark}
            onOpenModal={setSelectedMember}
          />
        );
      default:
        return null;
    }
  };

  if (error) {
    return (
      <div className={`min-h-screen py-12 ${isDark ? 'bg-gray-900' : 'bg-[#90d2dc]'}`}>
        <div className="max-w-6xl mx-auto px-4">
          <div className={`text-center ${isDark ? 'text-red-400' : 'text-red-600'}`}>
            {error}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen py-12 ${isDark ? 'bg-gray-900' : 'bg-[#90d2dc]'}`}>
      <div className="max-w-6xl mx-auto px-4">
        <h1 className={`text-3xl font-bold mb-8 ${isDark ? 'text-white' : 'text-gray-800'}`}>
          Search Results for "{searchTerm}"
        </h1>

        {results.length === 0 ? (
          <p className={`text-lg ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
            No results found. Please try a different search term.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {results.map((item) => (
              <div
                key={`${item.type}-${item.id}`}
                className={`rounded-lg ${isDark ? 'bg-gray-800' : 'bg-white'} shadow`}
              >
                {renderResultItem(item)}
              </div>
            ))}
          </div>
        )}

        <AnimatePresence>
          {selectedPhoto && (
            <PhotoModal
              photo={selectedPhoto}
              isDark={isDark}
              onClose={() => setSelectedPhoto(null)}
            />
          )}
          {selectedMember && (
            <TeamMemberModal
              member={selectedMember}
              isDark={isDark}
              onClose={() => setSelectedMember(null)}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
