"use client";

import Image from "next/image";
import { motion } from "framer-motion";

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

interface TeamMemberProps {
  member: TeamMemberData;
  isDark: boolean;
  onOpenModal: (member: TeamMemberData) => void;
}

export default function TeamMember({ member, isDark, onOpenModal }: TeamMemberProps) {
  const truncatedBio = member.bio.length > 100 
    ? member.bio.substring(0, 100).trim() + "..."
    : member.bio;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`p-6 rounded-lg shadow-md ${isDark ? "bg-gray-800" : "bg-[#90d2dc]"}`}
    >
      <div className="w-32 h-32 relative mx-auto mb-4">
        <Image
          src={member.imageUrl}
          alt={member.name}
          fill
          className="rounded-full object-cover"
          sizes="128px"
          priority
        />
      </div>

      <h3 className={`text-xl font-semibold mb-2 text-center ${
        isDark ? "text-white" : "text-gray-800"
      }`}>
        {member.name}
      </h3>

      <p className={`text-center mb-2 ${
        isDark ? "text-gray-300" : "text-gray-600"
      }`}>
        {member.role}
      </p>

      <p className={`text-sm mb-4 ${
        isDark ? "text-gray-400" : "text-gray-700"
      }`}>
        {truncatedBio}
      </p>

      <button
        onClick={() => onOpenModal(member)}
        className={`w-full py-2 rounded ${
          isDark 
            ? "bg-blue-600 hover:bg-blue-700" 
            : "bg-blue-500 hover:bg-blue-600"
        } text-white transition duration-300`}
        aria-label={`More information about ${member.name}`}
      >
        More Info
      </button>
    </motion.div>
  );
}