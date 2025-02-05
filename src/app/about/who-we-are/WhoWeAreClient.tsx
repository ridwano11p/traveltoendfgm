"use client";

import { useState } from 'react';
import { useTheme } from '@/context/ThemeContext';
import { useSearchParams } from 'next/navigation';
import { TeamMember as TeamMemberType } from './types';
import TeamMemberCard from './components/TeamMember';
import TeamMemberModal from './components/TeamMemberModal';
import { motion } from 'framer-motion';

interface Props {
  teamMembers: TeamMemberType[];
}

export default function WhoWeAreClient({ teamMembers }: Props) {
  const { theme } = useTheme();
  const searchParams = useSearchParams();
  const [selectedMember, setSelectedMember] = useState<TeamMemberType | null>(null);
  const isDark = theme === 'dark';

  const isSearchResult = searchParams.has('q');
  const searchQuery = searchParams.get('q');

  return (
    <div className={`min-h-screen ${
      isDark 
        ? 'bg-gradient-to-b from-gray-900 to-gray-800' 
        : 'bg-gradient-to-b from-[#90d2dc] to-[#c7e8ef]'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 lg:py-16">
        {/* Page Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12 md:mb-16"
        >
          <h1 className={`text-3xl md:text-4xl lg:text-5xl font-bold mb-4 ${
            isDark ? "text-white" : "text-gray-800"
          }`}>
            {isSearchResult ? 'Search Results' : 'Meet Our Team'}
          </h1>
          {isSearchResult ? (
            <p className={`text-lg md:text-xl ${
              isDark ? "text-gray-300" : "text-gray-600"
            }`}>
              Results for "{searchQuery}"
            </p>
          ) : (
            <p className={`text-lg md:text-xl max-w-3xl mx-auto ${
              isDark ? "text-gray-300" : "text-gray-600"
            }`}>
              Dedicated professionals working together to end FGM through education, advocacy, and community engagement.
            </p>
          )}
        </motion.div>

        {/* Team Members Grid */}
        {teamMembers.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {teamMembers.map((member) => (
              <TeamMemberCard
                key={member.id}
                member={member}
                isDark={isDark}
                onOpenModal={setSelectedMember}
              />
            ))}
          </div>
        ) : (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={`text-center py-16 rounded-xl ${
              isDark 
                ? 'bg-gray-800/90' 
                : 'bg-[#90d2dc]/90'
            } backdrop-blur-sm shadow-lg`}
          >
            <p className={`text-lg md:text-xl ${
              isDark ? "text-gray-300" : "text-gray-600"
            }`}>
              {isSearchResult
                ? 'No team members found matching your search.'
                : 'No team members available at the moment.'}
            </p>
            {isSearchResult && (
              <a
                href="/about/who-we-are"
                className={`inline-block mt-4 px-6 py-3 rounded-lg text-sm md:text-base font-medium ${
                  isDark 
                    ? 'bg-green-600 hover:bg-green-700 text-white' 
                    : 'bg-green-500 hover:bg-green-600 text-white'
                } transition-all duration-300 hover:shadow-lg`}
              >
                View All Team Members
              </a>
            )}
          </motion.div>
        )}
      </div>

      {/* Team Member Modal */}
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
