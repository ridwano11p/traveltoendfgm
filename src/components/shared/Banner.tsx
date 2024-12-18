"use client";

import { useTheme } from '@/context/ThemeContext';
import MediaContent from './MediaContent';
import type { BannerData } from '../server/BannerData';

interface BannerProps {
  bannerContent: BannerData | null;
}

const formatContent = (content: string) => {
  return content.split('\n').map((paragraph, index) => (
    <p key={index} className="mb-2 last:mb-0">
      {paragraph}
    </p>
  ));
};

const Banner = ({ bannerContent }: BannerProps) => {
  const { darkMode } = useTheme();

  if (!bannerContent) return null;

  return (
    <div className={`w-full ${darkMode ? 'bg-gray-900' : 'bg-gray-200'}`}>
      <div className="max-w-7xl mx-auto px-4 py-12 flex flex-col md:flex-row items-center justify-between">
        <div className="md:w-1/2 mb-8 md:mb-0 md:pr-8">
          <h1 className={`text-4xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-black'}`}>
            {bannerContent.title}
          </h1>
          <div className={`text-xl ${darkMode ? 'text-gray-200' : 'text-black'}`}>
            {formatContent(bannerContent.description)}
          </div>
        </div>
        <div className="md:w-5/12 w-full">
          <MediaContent
            mediaUrl={bannerContent.mediaUrl}
            mediaType={bannerContent.mediaType}
            isYouTubeVideo={bannerContent.isYouTubeVideo}
            title={bannerContent.title}
          />
        </div>
      </div>
    </div>
  );
};

export default Banner;