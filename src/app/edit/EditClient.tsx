"use client";

import { useEffect, useState } from 'react';
import { useTheme } from '@/context/ThemeContext';
import { getContentExistence } from '@/utils/contentChecks';
import EditOption from './components/EditOption';
import { ContentExistence, EditOptionData } from './types';

const editOptions: EditOptionData[] = [
  {
    title: "Edit Blog Posts",
    description: "Edit or delete existing blog posts in Impact Stories.",
    link: "/edit/blog"
  },
  {
    title: "Edit Feature Stories",
    description: "Update or remove feature stories from the homepage.",
    link: "/edit/feature-story"
  },
  {
    title: "Edit Team Members",
    description: "Update or remove team members from the 'Who We Are' section.",
    link: "/edit/team-members"
  },
  {
    title: "Edit Videos",
    description: "Update or remove videos from the Documentaries section.",
    link: "/edit/video"
  },
  {
    title: "Edit 'What We Do' Info",
    description: "Update information in the 'What We Do' section.",
    link: "/edit/what-we-do",
    checkKey: "What We Do"
  },
  {
    title: "Edit PDFs",
    description: "Update or remove PDFs from the Research and Reports section.",
    link: "/edit/pdf"
  },
  {
    title: "Edit Photos",
    description: "Update or remove photos from the Gallery section.",
    link: "/edit/photo"
  },
  {
    title: "Edit Contact Info",
    description: "Update contact information for the Contact Us page.",
    link: "/edit/contact-info"
  },
  {
    title: "Edit Banner",
    description: "Update or remove the banner from the homepage.",
    link: "/edit/banner",
    checkKey: "Banner"
  }
];

export default function EditClient() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [contentExists, setContentExists] = useState<ContentExistence>({});

  useEffect(() => {
    const fetchContentExistence = async () => {
      try {
        const existence = await getContentExistence();
        setContentExists(existence);
      } catch (error) {
        console.error('Error fetching content existence:', error);
      }
    };

    fetchContentExistence();
  }, []);

  return (
    <div className={`min-h-screen py-12 ${isDark ? 'bg-gray-900' : 'bg-[#90d2dc]'}`}>
      <div className="max-w-6xl mx-auto px-4">
        <h1 className={`text-4xl font-bold mb-8 text-center ${isDark ? 'text-white' : 'text-gray-800'}`}>
          Edit Content
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {editOptions.map((option) => (
            <EditOption
              key={option.link}
              title={option.title}
              description={option.description}
              link={option.link}
              disabled={option.checkKey ? !contentExists[option.checkKey] : false}
            />
          ))}
        </div>
      </div>
    </div>
  );
}