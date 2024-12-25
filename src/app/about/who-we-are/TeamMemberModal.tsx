"use client";

import { useEffect, useCallback } from "react";
import Image from "next/image";
import { FaLinkedin, FaFacebook, FaYoutube, FaTwitter } from "react-icons/fa";
import SocialMediaButton from "./SocialMediaButton";

interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  imageUrl: string;
  linkedin?: string;
  facebook?: string;
  youtube?: string;
  twitter?: string;
}

interface TeamMemberModalProps {
  member: TeamMember;
  isDark: boolean;
  onClose: () => void;
}

export default function TeamMemberModal({ member, isDark, onClose }: TeamMemberModalProps) {
  const socialMediaLinks = [
    { icon: <FaLinkedin />, link: member.linkedin },
    { icon: <FaFacebook />, link: member.facebook },
    { icon: <FaYoutube />, link: member.youtube },
    { icon: <FaTwitter />, link: member.twitter },
  ].filter(item => item.link);

  const handleEscape = useCallback((e: KeyboardEvent) => {
    if (e.key === "Escape") {
      onClose();
    }
  }, [onClose]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = "unset";
      document.removeEventListener("keydown", handleEscape);
    };
  }, [handleEscape]);

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 overflow-y-auto"
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div 
        className={`relative max-w-2xl w-full rounded-lg shadow-lg ${
          isDark ? "bg-gray-800" : "bg-[#90d2dc]"
        } p-6 m-4 max-h-[90vh] overflow-y-auto`}
      >
        <button
          onClick={onClose}
          className={`sticky top-0 float-right text-2xl ${
            isDark ? "text-gray-300" : "text-gray-600"
          } hover:text-gray-500 z-10 transition duration-300`}
          aria-label="Close modal"
        >
          &times;
        </button>

        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0">
          <div className="md:w-1/3">
            <div className="w-40 h-40 relative mx-auto">
              <Image
                src={member.imageUrl}
                alt={member.name}
                fill
                className="rounded-full object-cover"
                sizes="160px"
              />
            </div>
          </div>
          <div className="md:w-2/3 md:pl-6">
            <h2 
              id="modal-title"
              className={`text-2xl font-semibold mb-2 ${isDark ? "text-white" : "text-gray-800"}`}
            >
              {member.name}
            </h2>
            <p className={`text-lg mb-4 ${isDark ? "text-gray-300" : "text-gray-600"}`}>
              {member.role}
            </p>
            <div className={`mb-4 whitespace-pre-wrap ${isDark ? "text-gray-300" : "text-gray-700"}`}>
              {member.bio}
            </div>
          </div>
        </div>

        <div className="flex justify-end mt-4 space-x-2 sticky bottom-0 bg-inherit py-2">
          {socialMediaLinks.length > 0 ? (
            socialMediaLinks.map((item, index) => (
              <SocialMediaButton 
                key={index} 
                icon={item.icon} 
                link={item.link || ""} 
                isDark={isDark} 
              />
            ))
          ) : (
            <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}>
              This team member has no social media links.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}