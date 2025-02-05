"use client";

import { TeamMemberModalProps } from '../types';
import { FaLinkedin, FaFacebook, FaYoutube, FaTwitter } from 'react-icons/fa';
import Image from 'next/image';
import SocialMediaButton from './SocialMediaButton';

export default function TeamMemberModal({ member, isDark, onClose }: TeamMemberModalProps) {
  const socialMediaLinks = [
    { icon: <FaLinkedin />, link: member.linkedin },
    { icon: <FaFacebook />, link: member.facebook },
    { icon: <FaYoutube />, link: member.youtube },
    { icon: <FaTwitter />, link: member.twitter },
  ].filter(item => item.link);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div 
        className={`relative w-full max-w-2xl rounded-xl shadow-2xl ${
          isDark ? 'bg-gray-800/95' : 'bg-[#90d2dc]/95'
        } overflow-hidden`}
      >
        {/* Desktop Layout */}
        <div className="hidden md:block">
          <div className="p-6">
            <button
              onClick={onClose}
              className={`absolute top-4 right-4 text-2xl ${
                isDark ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-800'
              } transition-colors`}
              aria-label="Close modal"
            >
              ×
            </button>
            <div className="flex gap-8">
              <div className="w-1/3 flex-shrink-0">
                <div className="relative w-48 h-48 mx-auto rounded-full overflow-hidden shadow-lg">
                  <Image
                    src={member.imageUrl}
                    alt={member.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 128px, 192px"
                  />
                </div>
                {socialMediaLinks.length > 0 && (
                  <div className="mt-6 flex justify-center gap-3">
                    {socialMediaLinks.map((item, index) => (
                      <SocialMediaButton
                        key={index}
                        icon={item.icon}
                        link={item.link}
                        isDark={isDark}
                      />
                    ))}
                  </div>
                )}
              </div>
              <div className="flex-1">
                <h2 className={`text-3xl font-bold mb-2 ${
                  isDark ? 'text-white' : 'text-gray-800'
                }`}>
                  {member.name}
                </h2>
                <p className={`text-xl mb-6 ${
                  isDark ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  {member.role}
                </p>
                <div className={`prose max-w-none ${
                  isDark ? 'text-gray-300 prose-invert' : 'text-gray-700'
                }`}>
                  {member.bio.split('\n').map((paragraph, index) => (
                    <p key={index} className="mb-4">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Layout */}
        <div className="md:hidden h-[90vh] flex flex-col">
          <div className="relative p-4 border-b border-gray-200/20">
            <button
              onClick={onClose}
              className={`absolute top-4 right-4 text-2xl ${
                isDark ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-800'
              } transition-colors`}
              aria-label="Close modal"
            >
              ×
            </button>
            <div className="relative w-24 h-24 mx-auto mb-4">
              <Image
                src={member.imageUrl}
                alt={member.name}
                fill
                className="rounded-full object-cover"
                sizes="96px"
              />
            </div>
            <h2 className={`text-2xl font-bold text-center mb-1 ${
              isDark ? 'text-white' : 'text-gray-800'
            }`}>
              {member.name}
            </h2>
            <p className={`text-lg text-center ${
              isDark ? 'text-gray-300' : 'text-gray-600'
            }`}>
              {member.role}
            </p>
          </div>

          <div className={`flex-1 overflow-y-auto p-4 ${
            isDark ? 'text-gray-300' : 'text-gray-700'
          }`}>
            {member.bio.split('\n').map((paragraph, index) => (
              <p key={index} className="mb-4">
                {paragraph}
              </p>
            ))}
          </div>

          {socialMediaLinks.length > 0 && (
            <div className={`p-4 border-t border-gray-200/20 ${
              isDark ? 'bg-gray-800/95' : 'bg-[#90d2dc]/95'
            } backdrop-blur-sm flex justify-center gap-3`}>
              {socialMediaLinks.map((item, index) => (
                <SocialMediaButton
                  key={index}
                  icon={item.icon}
                  link={item.link}
                  isDark={isDark}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
