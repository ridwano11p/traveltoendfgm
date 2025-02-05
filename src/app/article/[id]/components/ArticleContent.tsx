"use client";

import React from 'react';
import { ArticleContentProps } from '../types';
import { motion } from 'framer-motion';

interface ParagraphProps {
  children: string;
  className?: string;
}

export default function ArticleContent({ content, isDark }: ArticleContentProps) {
  const formatContent = (text: string) => {
    return text.split('\n').map((paragraph, index) => {
      // Skip empty paragraphs
      if (!paragraph.trim()) return null;

      return (
        <motion.p
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className={`mb-6 last:mb-0 text-base md:text-lg leading-relaxed ${
            isDark ? 'text-gray-300' : 'text-gray-700'
          }`}
        >
          {paragraph}
        </motion.p>
      );
    }).filter(Boolean); // Remove null values
  };

  // Add drop cap to first paragraph
  const enhanceFirstParagraph = (paragraphs: React.ReactNode[]) => {
    if (!paragraphs.length) return paragraphs;

    const firstParagraph = paragraphs[0] as React.ReactElement<ParagraphProps>;
    if (!React.isValidElement(firstParagraph)) return paragraphs;

    const text = firstParagraph.props.children;
    if (typeof text !== 'string' || text.length < 1) return paragraphs;

    const firstLetter = text[0];
    const restOfText = text.slice(1);

    const enhancedFirstParagraph = (
      <motion.p
        key={0}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className={`mb-6 text-base md:text-lg leading-relaxed ${
          isDark ? 'text-gray-300' : 'text-gray-700'
        }`}
      >
        <span className={`float-left text-5xl md:text-6xl font-serif leading-none mr-2 mt-1 ${
          isDark ? 'text-green-400' : 'text-green-600'
        }`}>
          {firstLetter}
        </span>
        {restOfText}
      </motion.p>
    );

    return [enhancedFirstParagraph, ...paragraphs.slice(1)];
  };

  const paragraphs = formatContent(content);
  const enhancedParagraphs = enhanceFirstParagraph(paragraphs);

  return (
    <div className={`prose prose-lg max-w-none ${
      isDark ? 'prose-invert' : ''
    }`}>
      <div className="space-y-6">
        {enhancedParagraphs}
      </div>

      {/* Pull Quote (if content is long enough) */}
      {content.length > 500 && (
        <motion.blockquote
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className={`my-12 px-8 py-6 border-l-4 italic text-xl md:text-2xl font-serif ${
            isDark 
              ? 'border-green-400 text-gray-300 bg-gray-800/50' 
              : 'border-green-600 text-gray-700 bg-green-50'
          }`}
        >
          {/* Extract a compelling quote from the content */}
          {content.split('.')[1]?.trim() || content.split(' ').slice(0, 15).join(' ') + '...'}
        </motion.blockquote>
      )}

      {/* Social Share Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.7 }}
        className={`mt-12 pt-8 border-t ${
          isDark ? 'border-gray-700' : 'border-gray-200'
        }`}
      >
        <p className={`text-sm mb-4 ${
          isDark ? 'text-gray-400' : 'text-gray-600'
        }`}>
          Share this article
        </p>
        <div className="flex space-x-4">
          {/* Add social share buttons here if needed */}
        </div>
      </motion.div>
    </div>
  );
}
