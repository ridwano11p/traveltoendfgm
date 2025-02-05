"use client";

import { useTheme } from '@/context/ThemeContext';
import { Article } from './types';
import MediaContent from './components/MediaContent';
import ArticleHeader from './components/ArticleHeader';
import ArticleContent from './components/ArticleContent';
import { motion } from 'framer-motion';

interface Props {
  article: Article;
}

export default function ArticleClient({ article }: Props) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <div className={`min-h-screen ${
      isDark 
        ? 'bg-gradient-to-b from-gray-900 to-gray-800' 
        : 'bg-gradient-to-b from-[#90d2dc] to-[#c7e8ef]'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 lg:py-16">
        <motion.article 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className={`rounded-2xl shadow-xl overflow-hidden backdrop-blur-sm ${
            isDark 
              ? 'bg-gray-800/90' 
              : 'bg-[#90d2dc]/90'
          }`}
        >
          {/* Desktop Layout */}
          <div className="hidden md:block">
            <div className="grid lg:grid-cols-2 gap-0">
              <div className="lg:order-2">
                <div className="sticky top-8 overflow-hidden">
                  <MediaContent
                    imageUrl={article.imageUrl}
                    videoUrl={article.videoUrl}
                    isYouTubeVideo={article.isYouTubeVideo}
                    title={article.title}
                  />
                </div>
              </div>
              <div className="lg:order-1">
                <div className="p-8 lg:p-12">
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
              </div>
            </div>
          </div>

          {/* Mobile Layout */}
          <div className="md:hidden">
            <div className="relative">
              <MediaContent
                imageUrl={article.imageUrl}
                videoUrl={article.videoUrl}
                isYouTubeVideo={article.isYouTubeVideo}
                title={article.title}
              />
            </div>
            <div className="p-4 sm:p-6">
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
          </div>
        </motion.article>

        {/* Back to Stories Button */}
        <div className="mt-8 text-center">
          <a
            href="/impact-stories"
            className={`inline-flex items-center px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
              isDark 
                ? 'bg-green-600 hover:bg-green-700 text-white' 
                : 'bg-green-500 hover:bg-green-600 text-white'
            } hover:shadow-lg transform hover:scale-105`}
          >
            Back to Stories
          </a>
        </div>
      </div>
    </div>
  );
}
