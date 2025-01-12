"use client";

import { ArticleContentProps } from '../types';

export default function ArticleContent({ content, isDark }: ArticleContentProps) {
  const formatContent = (text: string) => {
    return text.split('\n').map((paragraph, index) => (
      paragraph.trim() && (
        <p key={index} className="mb-6 last:mb-0">
          {paragraph}
        </p>
      )
    ));
  };

  return (
    <div className={`prose ${isDark ? 'prose-invert' : ''} max-w-none`}>
      {formatContent(content)}
    </div>
  );
}
