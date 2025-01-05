"use client";

import { useState } from 'react';
import { useTheme } from '@/context/ThemeContext';
import { useSearchParams } from 'next/navigation';
import TeamMember from './TeamMember';
import TeamMemberModal, { TeamMember as TeamMemberType } from './TeamMemberModal';

interface Props {
  teamMembers: TeamMemberType[];
}

export default function WhoWeAreClient({ teamMembers }: Props) {
  const { theme } = useTheme();
  const searchParams = useSearchParams();
  const [selectedMember, setSelectedMember] = useState<TeamMemberType | null>(null);

  const isDark = theme === 'dark';
  const isSearchResult = searchParams.get('q') !== null;

  return (
    <div className={`min-h-screen py-12 ${isDark ? 'bg-gray-900' : 'bg-[#90d2dc]'}`}>
      <div className="max-w-6xl mx-auto px-4">
        <h1 className={`text-4xl font-bold mb-8 text-center ${isDark ? 'text-white' : 'text-gray-800'}`}>
          {isSearchResult ? 'Search Results' : 'Who We Are'}
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {teamMembers.map((member) => (
            <TeamMember
              key={member.id}
              member={member}
              isDark={isDark}
              onOpenModal={setSelectedMember}
            />
          ))}
        </div>
        {isSearchResult && teamMembers.length === 0 && (
          <p className={`text-center mt-8 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
            No team members found matching your search.
          </p>
        )}
      </div>
      {selectedMember && (
        <TeamMemberModal
          member={selectedMember}
          isDark={isDark}
          onClose={() => setSelectedMember(null)}
        />
      )}
    </div>
  );
}