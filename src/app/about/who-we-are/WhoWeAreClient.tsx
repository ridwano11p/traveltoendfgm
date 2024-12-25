"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { useTheme } from "@/context/ThemeContext";
import { AnimatePresence } from "framer-motion";
import TeamMember from "./TeamMember";
import TeamMemberModal from "./TeamMemberModal";

interface TeamMemberData {
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

interface WhoWeAreClientProps {
  teamMembers: TeamMemberData[];
}

export default function WhoWeAreClient({ teamMembers }: WhoWeAreClientProps) {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const searchParams = useSearchParams();
  const [selectedMember, setSelectedMember] = useState<TeamMemberData | null>(null);

  const isSearchResult = searchParams.get("q") !== null;

  const openModal = (member: TeamMemberData) => {
    setSelectedMember(member);
  };

  const closeModal = () => {
    setSelectedMember(null);
  };

  return (
    <div className={`min-h-screen py-12 ${isDark ? "bg-gray-900" : "bg-[#90d2dc]"}`}>
      <div className="max-w-6xl mx-auto px-4">
        <h1 className={`text-4xl font-bold mb-8 text-center ${
          isDark ? "text-white" : "text-gray-800"
        }`}>
          {isSearchResult ? "Search Results" : "Who We Are"}
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="wait">
            {teamMembers.map((member) => (
              <TeamMember
                key={member.id}
                member={member}
                isDark={isDark}
                onOpenModal={openModal}
              />
            ))}
          </AnimatePresence>
        </div>

        {isSearchResult && teamMembers.length === 0 && (
          <p className={`text-center mt-8 ${
            isDark ? "text-gray-300" : "text-gray-600"
          }`}>
            No team members found matching your search.
          </p>
        )}
      </div>

      {selectedMember && (
        <TeamMemberModal
          member={selectedMember}
          isDark={isDark}
          onClose={closeModal}
        />
      )}
    </div>
  );
}