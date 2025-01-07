"use client";

import Image from "next/image";
import { FaCalendar, FaUser } from "react-icons/fa";
import { useTheme } from "@/context/ThemeContext";
import VideoPlayer from "@/components/shared/VideoPlayer";
import { ArticleData, MediaContentProps, ArticleClientProps } from "./types";

const MediaContent = ({ imageUrl, videoUrl, isYouTubeVideo = false, title }: MediaContentProps) => {
  const containerClasses = "w-full aspect-square md:aspect-video bg-black flex items-center justify-center overflow-hidden relative";
  const mediaClasses = "w-full h-full object-contain";

  if (imageUrl && videoUrl) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className={containerClasses}>
          <Image
            src={imageUrl}
            alt={title}
            fill
            className={mediaClasses}
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
        <div className={containerClasses}>
          <VideoPlayer
            videoUrl={videoUrl}
            isYouTubeVideo={isYouTubeVideo}
          />
        </div>
      </div>
    );
  }

  if (videoUrl) {
    return (
      <div className={containerClasses}>
        <VideoPlayer
          videoUrl={videoUrl}
          isYouTubeVideo={isYouTubeVideo}
        />
      </div>
    );
  }

  if (imageUrl) {
    return (
      <div className={containerClasses}>
        <Image
          src={imageUrl}
          alt={title}
          fill
          className={mediaClasses}
          sizes="100vw"
          priority
        />
      </div>
    );
  }

  return null;
};

const formatContent = (content: string) => {
  return content.split("\n").map((paragraph, index) => (
    <p key={index} className="mb-6 last:mb-0">
      {paragraph}
    </p>
  ));
};

const formatDate = (dateString?: string) => {
  if (!dateString) return null;
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

export default function ArticleClient({ article }: ArticleClientProps) {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const displayDate = article.date || (article.createdAt ? formatDate(article.createdAt) : null);

  return (
    <div className={`min-h-screen ${isDark ? "bg-gray-900" : "bg-[#90d2dc]"}`}>
      <div className="max-w-4xl mx-auto px-4 py-12">
        <article className={`rounded-lg shadow-lg overflow-hidden ${
          isDark ? "bg-gray-800 text-gray-100" : "bg-[#90d2dc] text-gray-800"
        }`}>
          {(article.imageUrl || article.videoUrl) && (
            <div className="mb-6">
              <MediaContent
                imageUrl={article.imageUrl}
                videoUrl={article.videoUrl}
                isYouTubeVideo={article.isYouTubeVideo}
                title={article.title}
              />
            </div>
          )}
          <div className="p-6 md:p-10">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              {article.title}
            </h1>
            <div className="flex flex-wrap items-center text-sm mb-6">
              {article.author && (
                <div className="flex items-center mr-6 mb-2">
                  <FaUser className="mr-2" />
                  <span>{article.author}</span>
                </div>
              )}
              {displayDate && (
                <div className="flex items-center mb-2">
                  <FaCalendar className="mr-2" />
                  <span>{displayDate}</span>
                </div>
              )}
            </div>
            {article.tags && article.tags.length > 0 && (
              <div className="mb-6">
                {article.tags.map(tag => (
                  <span
                    key={tag}
                    className={`inline-block px-3 py-1 rounded-full text-sm font-semibold mr-2 mb-2 ${
                      isDark ? "bg-blue-600 text-white" : "bg-blue-100 text-blue-800"
                    }`}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
            <div className={`prose ${isDark ? "prose-invert" : ""} max-w-none`}>
              {formatContent(article.content)}
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}
