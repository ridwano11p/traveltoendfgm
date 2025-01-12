"use client";

import { TagClientProps } from './types';
import { useTheme } from '@/context/ThemeContext';
import Link from 'next/link';
import MediaPreview from './components/MediaPreview';

export default function TagClient({ posts, tag }: TagClientProps) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <div className={`min-h-screen ${isDark ? 'bg-gray-900 text-white' : 'bg-[#90d2dc] text-gray-900'}`}>
      <div className="max-w-6xl mx-auto px-4 py-12">
        <h1 className={`text-4xl font-bold mb-8 ${isDark ? 'text-white' : 'text-gray-800'}`}>
          Posts tagged with “{tag}”
        </h1>
        {posts.length === 0 ? (
          <p className={`text-xl ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
            No posts found with this tag.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map(post => (
              <Link
                key={post.id}
                href={`/article/${post.id}`}
                className={`block rounded-lg shadow-md overflow-hidden transition duration-300 ${
                  isDark
                    ? 'bg-gray-800 hover:bg-gray-700'
                    : 'bg-white hover:bg-gray-50'
                }`}
              >
                <MediaPreview post={post} isDark={isDark} />
                <div className="p-6">
                  <h2 className={`text-xl font-semibold mb-2 ${isDark ? 'text-white' : 'text-gray-800'}`}>
                    {post.title}
                  </h2>
                  <p className={`mb-2 text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    {post.type === 'featureStory' ? 'Featured Story' : 'Blog Post'}
                  </p>
                  <p className={`mb-4 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                    {post.content.substring(0, 150)}...
                  </p>
                  <div className="flex flex-wrap">
                    {post.tags.map(postTag => (
                      <span
                        key={postTag}
                        className={`inline-block px-2 py-1 rounded-full text-sm font-semibold mr-2 mb-2 ${
                          isDark ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-700'
                        }`}
                      >
                        {postTag}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
