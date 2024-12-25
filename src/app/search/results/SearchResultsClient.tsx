"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useTheme } from "@/context/ThemeContext";
import { AnimatePresence } from "framer-motion";
import BlogCard from "./components/BlogCard";
import VideoCard from "./components/VideoCard";
import PhotoCard from "./components/PhotoCard";
import PhotoModal from "./components/PhotoModal";
import PDFCard from "./components/PDFCard";
import TeamMember from "@/app/about/who-we-are/TeamMember";
import TeamMemberModal from "@/app/about/who-we-are/TeamMemberModal";

interface SearchResult {
  id: string;
  type: string;
  title: string;
  description?: string;
  content?: string;
  author?: string;
  date?: string;
  imageUrl?: string;
  videoUrl?: string;
  isYouTube?: boolean;
  pdfUrl?: string;
  photoUrl?: string;
  tags?: string[];
  name?: string;
  role?: string;
  bio?: string;
  linkedin?: string;
  facebook?: string;
  youtube?: string;
  twitter?: string;
}

interface SearchResultsClientProps {
  results: SearchResult[];
}

export default function SearchResultsClient({ results }: SearchResultsClientProps) {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const router = useRouter();
  const searchParams = useSearchParams();
  const searchTerm = searchParams.get("q") || "";

  const [selectedPhoto, setSelectedPhoto] = useState<SearchResult | null>(null);
  const [selectedMember, setSelectedMember] = useState<SearchResult | null>(null);

  const handleTagClick = (tag: string) => {
    router.push(`/search/results?q=${encodeURIComponent(tag)}&type=all`);
  };

  const handlePhotoClick = (photo: SearchResult) => {
    setSelectedPhoto(photo);
  };

  const handleClosePhoto = () => {
    setSelectedPhoto(null);
  };

  const openModal = (member: SearchResult) => {
    setSelectedMember(member);
  };

  const closeModal = () => {
    setSelectedMember(null);
  };

  const renderResultItem = (item: SearchResult) => {
    switch (item.type) {
      case "blogs":
      case "featureStories":
        return (
          <BlogCard
            blog={{
              id: item.id,
              title: item.title,
              content: item.content || "",
              author: item.author,
              date: item.date,
              imageUrl: item.imageUrl,
              videoUrl: item.videoUrl,
              isYouTubeVideo: item.isYouTube,
              tags: item.tags
            }}
            isDark={isDark}
            onTagClick={handleTagClick}
          />
        );

      case "videos":
        return (
          <VideoCard
            video={{
              id: item.id,
              title: item.title,
              description: item.description || "",
              videoUrl: item.videoUrl || "",
              isYouTube: item.isYouTube,
              thumbnailUrl: item.imageUrl
            }}
            isDark={isDark}
          />
        );

      case "photos":
        return (
          <PhotoCard
            photo={{
              id: item.id,
              title: item.title,
              description: item.description,
              photoUrl: item.photoUrl || ""
            }}
            isDark={isDark}
            onClick={handlePhotoClick}
          />
        );

      case "pdfs":
        return (
          <PDFCard
            pdf={{
              id: item.id,
              title: item.title,
              description: item.description || "",
              pdfUrl: item.pdfUrl || ""
            }}
            isDark={isDark}
          />
        );

      case "team_members":
        return (
          <TeamMember
            member={{
              id: item.id,
              name: item.name || "",
              role: item.role || "",
              bio: item.bio || "",
              imageUrl: item.imageUrl || "",
              linkedin: item.linkedin,
              facebook: item.facebook,
              youtube: item.youtube,
              twitter: item.twitter
            }}
            isDark={isDark}
            onOpenModal={openModal}
          />
        );

      default:
        return null;
    }
  };

  return (
    <div className={`min-h-screen py-12 ${isDark ? "bg-gray-900" : "bg-[#90d2dc]"}`}>
      <div className="max-w-6xl mx-auto px-4">
        <h1 className={`text-3xl font-bold mb-8 ${isDark ? "text-white" : "text-gray-800"}`}>
          Search Results for "{searchTerm}"
        </h1>

        {results.length === 0 ? (
          <p className={`text-lg ${isDark ? "text-gray-300" : "text-gray-600"}`}>
            No results found. Please try a different search term.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {results.map((item) => (
              <div
                key={`${item.type}-${item.id}`}
                className={`rounded-lg ${isDark ? "bg-gray-800" : "bg-white"} shadow`}
              >
                {renderResultItem(item)}
              </div>
            ))}
          </div>
        )}
      </div>

      <AnimatePresence>
        {selectedPhoto && (
          <PhotoModal
            photo={{
              id: selectedPhoto.id,
              title: selectedPhoto.title,
              description: selectedPhoto.description,
              photoUrl: selectedPhoto.photoUrl || ""
            }}
            isDark={isDark}
            onClose={handleClosePhoto}
          />
        )}

        {selectedMember && (
          <TeamMemberModal
            member={{
              id: selectedMember.id,
              name: selectedMember.name || "",
              role: selectedMember.role || "",
              bio: selectedMember.bio || "",
              imageUrl: selectedMember.imageUrl || "",
              linkedin: selectedMember.linkedin,
              facebook: selectedMember.facebook,
              youtube: selectedMember.youtube,
              twitter: selectedMember.twitter
            }}
            isDark={isDark}
            onClose={closeModal}
          />
        )}
      </AnimatePresence>
    </div>
  );
}