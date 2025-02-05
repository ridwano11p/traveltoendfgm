"use client";

import { TeamMemberCardProps } from '../types';
import Image from 'next/image';

export default function TeamMember({ member, isDark, onOpenModal }: TeamMemberCardProps) {
  const truncatedBio = member.bio.length > 150 ?
    member.bio.substring(0, 150) + '...' :
    member.bio;

  return (
    <div 
      className={`group relative overflow-hidden rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl ${
        isDark ? 'bg-gray-800/90 hover:bg-gray-800' : 'bg-white/90 hover:bg-white'
      }`}
    >
      {/* Desktop Layout */}
      <div className="hidden md:block p-6">
        <div className="relative w-40 h-40 mx-auto mb-6 transition-transform duration-300 group-hover:scale-105">
          <Image
            src={member.imageUrl}
            alt={member.name}
            fill
            className="rounded-full object-cover shadow-md"
            sizes="160px"
          />
        </div>
        <div className="text-center">
          <h3 className={`text-2xl font-bold mb-2 ${
            isDark ? 'text-white' : 'text-gray-800'
          }`}>
            {member.name}
          </h3>
          <p className={`text-lg mb-4 ${
            isDark ? 'text-gray-300' : 'text-gray-600'
          }`}>
            {member.role}
          </p>
          <p className={`text-sm mb-6 line-clamp-3 ${
            isDark ? 'text-gray-400' : 'text-gray-700'
          }`}>
            {truncatedBio}
          </p>
          <button
            onClick={() => onOpenModal(member)}
            className={`w-full py-3 px-6 rounded-lg font-medium transition-all duration-300 transform ${
              isDark 
                ? 'bg-green-600 hover:bg-green-700 active:bg-green-800' 
                : 'bg-green-500 hover:bg-green-600 active:bg-green-700'
            } text-white hover:shadow-lg active:scale-98`}
          >
            View Profile
          </button>
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="md:hidden">
        <div className="flex items-center p-4">
          <div className="relative w-20 h-20 flex-shrink-0">
            <Image
              src={member.imageUrl}
              alt={member.name}
              fill
              className="rounded-full object-cover shadow-md"
              sizes="80px"
            />
          </div>
          <div className="ml-4 flex-1">
            <h3 className={`text-lg font-bold mb-1 ${
              isDark ? 'text-white' : 'text-gray-800'
            }`}>
              {member.name}
            </h3>
            <p className={`text-sm mb-2 ${
              isDark ? 'text-gray-300' : 'text-gray-600'
            }`}>
              {member.role}
            </p>
          </div>
        </div>
        <div className="px-4 pb-4">
          <p className={`text-sm mb-4 line-clamp-2 ${
            isDark ? 'text-gray-400' : 'text-gray-700'
          }`}>
            {truncatedBio}
          </p>
          <button
            onClick={() => onOpenModal(member)}
            className={`w-full py-2 px-4 rounded-lg text-sm font-medium transition-all duration-300 ${
              isDark 
                ? 'bg-green-600 hover:bg-green-700 active:bg-green-800' 
                : 'bg-green-500 hover:bg-green-600 active:bg-green-700'
            } text-white hover:shadow-md active:scale-98`}
          >
            View Profile
          </button>
        </div>
      </div>
    </div>
  );
}
