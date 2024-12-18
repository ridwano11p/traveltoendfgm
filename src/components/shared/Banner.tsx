"use client";

import { useEffect, useState } from "react";
import { collection, query, orderBy, limit, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase/config";
import { useTheme } from "@/context/ThemeContext";
import Image from "next/image";

interface BannerContent {
  title: string;
  description: string;
  mediaUrl: string;
  mediaType: "image" | "video";
  isYouTubeVideo: boolean;
}

const MediaContent = ({ 
  mediaUrl, 
  mediaType, 
  isYouTubeVideo, 
  title 
}: { 
  mediaUrl: string; 
  mediaType: "image" | "video"; 
  isYouTubeVideo: boolean; 
  title: string; 
}) => {
  if (mediaType === "video") {
    if (isYouTubeVideo) {
      const videoId = mediaUrl.split("v=")[1];
      return (
        <div className="w-full aspect-video">
          <iframe
            src={`https://www.youtube.com/embed/${videoId}`}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full rounded-lg"
          />
        </div>
      );
    } else {
      return (
        <div className="w-full aspect-video">
          <video
            src={mediaUrl}
            className="w-full h-full object-cover rounded-lg"
            controls
            playsInline
          />
        </div>
      );
    }
  } else {
    return (
      <div className="relative w-full aspect-video">
        <Image
          src={mediaUrl}
          alt={title}
          fill
          className="object-cover rounded-lg"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority
        />
      </div>
    );
  }
};

const formatContent = (content: string) => {
  return content.split("\n").map((paragraph, index) => (
    <p key={index} className="mb-2 last:mb-0">
      {paragraph}
    </p>
  ));
};

export default function Banner() {
  const [bannerContent, setBannerContent] = useState<BannerContent | null>(null);
  const { theme } = useTheme();

  useEffect(() => {
    const fetchBannerContent = async () => {
      try {
        const q = query(
          collection(db, "banners"),
          orderBy("createdAt", "desc"),
          limit(1)
        );
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
          setBannerContent(querySnapshot.docs[0].data() as BannerContent);
        }
      } catch (err) {
        console.error("Error fetching banner content: ", err);
      }
    };

    fetchBannerContent();
  }, []);

  if (!bannerContent) return null;

  return (
    <div className={`w-full ${theme === "dark" ? "bg-gray-900" : "bg-gray-200"}`}>
      <div className="max-w-7xl mx-auto px-4 py-12 flex flex-col md:flex-row items-center justify-between">
        <div className="md:w-1/2 mb-8 md:mb-0 md:pr-8">
          <h1 className={`text-4xl font-bold mb-4 ${
            theme === "dark" ? "text-white" : "text-black"
          }`}>
            {bannerContent.title}
          </h1>
          <div className={`text-xl ${
            theme === "dark" ? "text-gray-200" : "text-black"
          }`}>
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
}