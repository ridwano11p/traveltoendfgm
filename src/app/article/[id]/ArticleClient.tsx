"use client";

import { useTheme } from '@/context/ThemeContext';
import { Article } from './types';
import MediaContent from './components/MediaContent';
import ArticleHeader from './components/ArticleHeader';
import ArticleContent from './components/ArticleContent';

interface Props {
  article: Article;
}

export default function ArticleClient({ article }: Props) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <div className={`min-h-screen ${isDark ? 'bg-gray-900' : 'bg-[#90d2dc]'}`}>
      <div className="max-w-4xl mx-auto px-4 py-12">
        <article className={`rounded-lg shadow-lg overflow-hidden ${
          isDark ? 'bg-gray-800 text-gray-100' : 'bg-[#90d2dc] text-gray-800'
        }`}>
          <div className="mb-6">
            <MediaContent
              imageUrl={article.imageUrl}
              videoUrl={article.videoUrl}
              isYouTubeVideo={article.isYouTubeVideo}
              title={article.title}
            />
          </div>

          <div className="p-6 md:p-10">
            <ArticleHeader
              title={article.title}
              author={article.author}
              date={article.date}
              tags={article.tags}
              isDark={isDark}
            />

            <ArticleContent
              content={article.content}
              isDark={isDark}
            />
          </div>
        </article>
      </div>
    </div>
  );
}
