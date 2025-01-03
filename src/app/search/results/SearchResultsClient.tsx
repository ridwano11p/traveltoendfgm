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
import { SearchResult, TeamMemberResult, ContentResult } from "@/types/search";

interface SearchResultsClientProps {
  results: SearchResult[];
}

export default function SearchResultsClient({ results }: SearchResultsClientProps) {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const router = useRouter();
  const searchParams = useSearchParams();
  const searchTerm = searchParams.get("q") || "";

  const [selectedPhoto, setSelectedPhoto] = useState<ContentResult | null>(null);
  const [selectedMember, setSelectedMember] = useState<TeamMemberResult | null>(null);

  const handleTagClick = (tag: string) => {
    router.push(`/search/results?q=${encodeURIComponent(tag)}&type=all`);
  };

  const handlePhotoClick = (photo: ContentResult) => {
    setSelectedPhoto(photo);
  };

  const handleClosePhoto = () => {
    setSelectedPhoto(null);
  };

  const openModal = (member: TeamMemberResult) => {
    setSelectedMember(member);
  };

  const closeModal = () => {
    setSelectedMember(null);
  };

  const renderResultItem = (item: SearchResult) => {
    switch (item.type) {
      case "blogs":
      case "featureStories": {
        const blogItem = item as ContentResult;
        return (
          <BlogCard
            blog={{
              id: blogItem.id,
              title: blogItem.title,
              content: blogItem.content || "",
              author: blogItem.author,
              date: blogItem.date,
              imageUrl: blogItem.imageUrl,
              videoUrl: blogItem.videoUrl,
              isYouTubeVideo: blogItem.isYouTube,
              tags: blogItem.tags
            }}
            isDark={isDark}
            onTagClick={handleTagClick}
          />
        );
      }

      case "videos": {
        const videoItem = item as ContentResult;
        return (
          <VideoCard
            video={{
              id: videoItem.id,
              title: videoItem.title,
              description: videoItem.description || "",
              videoUrl: videoItem.videoUrl || "",
              isYouTube: videoItem.isYouTube,
              thumbnailUrl: videoItem.imageUrl
            }}
            isDark={isDark}
          />
        );
      }

      case "photos": {
        const photoItem = item as ContentResult;
        return (
          <PhotoCard
            photo={{
              id: photoItem.id,
              title: photoItem.title,
              description: photoItem.description,
              photoUrl: photoItem.photoUrl || ""
            }}
            isDark={isDark}
            onClick={() => handlePhotoClick(photoItem)}
          />
        );
      }

      case "pdfs": {
        const pdfItem = item as ContentResult;
        return (
          <PDFCard
            pdf={{
              id: pdfItem.id,
              title: pdfItem.title,
              description: pdfItem.description || "",
              pdfUrl: pdfItem.pdfUrl || ""
            }}
            isDark={isDark}
          />
        );
      }

      case "team_members": {
        const memberItem = item as TeamMemberResult;
        return (
          <TeamMember
            member={{
              id: memberItem.id,
              name: memberItem.name,
              role: memberItem.role || "",
              bio: memberItem.bio || "",
              imageUrl: memberItem.imageUrl || "",
              linkedin: memberItem.linkedin,
              facebook: memberItem.facebook,
              youtube: memberItem.youtube,
              twitter: memberItem.twitter
            }}
            isDark={isDark}
            onOpenModal={() => openModal(memberItem)}
          />
        );
      }

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
              name: selectedMember.name,
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
