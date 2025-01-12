"use client";

import { TeamMemberCardProps } from '../types';
import Image from 'next/image';

export default function TeamMember({ member, isDark, onOpenModal }: TeamMemberCardProps) {
  const truncatedBio = member.bio.length > 100 ?
    member.bio.substring(0, 100) + '...' :
    member.bio;

  return (
    <div className={`p-6 rounded-lg shadow-md ${isDark ? 'bg-gray-800' : 'bg-[#90d2dc]'}`}>
      <div className="relative w-32 h-32 mx-auto mb-4">
        <Image
          src={member.imageUrl}
          alt={member.name}
          fill
          className="rounded-full object-cover"
          sizes="128px"
        />
      </div>
      <h3 className={`text-xl font-semibold mb-2 text-center ${
        isDark ? 'text-white' : 'text-gray-800'
      }`}>
        {member.name}
      </h3>
      <p className={`text-center mb-2 ${
        isDark ? 'text-gray-300' : 'text-gray-600'
      }`}>
        {member.role}
      </p>
      <p className={`text-sm mb-4 ${
        isDark ? 'text-gray-400' : 'text-gray-700'
      }`}>
        {truncatedBio}
      </p>
      <button
        onClick={() => onOpenModal(member)}
        className={`w-full py-2 rounded ${
          isDark ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'
        } text-white transition duration-300`}
      >
        More Info
      </button>
    </div>
  );
}
