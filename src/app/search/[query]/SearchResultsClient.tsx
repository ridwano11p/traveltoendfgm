"use client";

import { useState } from 'react';
import { useTheme } from '@/context/ThemeContext';
import { useRouter } from 'next/navigation';
import { AnimatePresence } from 'framer-motion';
import {
  SearchResult,
  BlogSearchResult,
  VideoSearchResult,
  PhotoSearchResult,
  PDFSearchResult,
  TeamMemberSearchResult,
  Photo,
  TeamMember
} from '../types';
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

  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);

  const handleTagClick = (tag: string) => {
    router.push(`/search/${encodeURIComponent(tag)}`);
  };

  const isBlogResult = (result: SearchResult): result is BlogSearchResult => {
    return result.type === 'blogs' || result.type === 'featureStories';
  };

  const isVideoResult = (result: SearchResult): result is VideoSearchResult => {
    return result.type === 'videos';
  };

  const isPhotoResult = (result: SearchResult): result is PhotoSearchResult => {
    return result.type === 'photos';
  };

  const isPDFResult = (result: SearchResult): result is PDFSearchResult => {
    return result.type === 'pdfs';
  };

  const isTeamMemberResult = (result: SearchResult): result is TeamMemberSearchResult => {
    return result.type === 'team_members';
  };

  const renderResultItem = (item: SearchResult) => {
    if (isBlogResult(item)) {
      return (
        <BlogCard
          blog={item}
          isDark={isDark}
          onTagClick={handleTagClick}
        />
      );
    }

    if (isVideoResult(item)) {
      return (
        <VideoCard
          video={item}
          isDark={isDark}
        />
      );
    }

    if (isPhotoResult(item)) {
      return (
        <PhotoCard
          photo={item}
          isDark={isDark}
          onClick={setSelectedPhoto}
        />
      );
    }

    if (isPDFResult(item)) {
      return (
        <PDFCard
          pdf={item}
          isDark={isDark}
        />
      );
    }

    if (isTeamMemberResult(item)) {
      return (
        <TeamMemberCard
          member={item}
          isDark={isDark}
          onOpenModal={setSelectedMember}
        />
      );
    }

    return null;
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
          Search Results for “{searchTerm}”
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
