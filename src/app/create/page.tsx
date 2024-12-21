"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useTheme } from '@/context/ThemeContext';
import { useAuth } from '@/context/AuthContext';
import { getContentExistence } from '@/utils/contentChecks';
import CreateOption from '@/components/shared/CreateOption';

export default function CreatePage() {
  const router = useRouter();
  const { theme } = useTheme();
  const { user } = useAuth();
  const [contentExists, setContentExists] = useState<Record<string, boolean>>({});

  useEffect(() => {
    // Redirect if not authenticated
    if (!user) {
      router.push('/login');
      return;
    }

    const fetchContentExistence = async () => {
      const existence = await getContentExistence();
      setContentExists(existence);
    };

    fetchContentExistence();
  }, [user, router]);

  // Show nothing while checking authentication
  if (!user) {
    return null;
  }

  return (
    <div className={`min-h-screen py-12 ${theme === 'dark' ? 'bg-gray-900' : 'bg-[#90d2dc]'}`}>
      <div className="max-w-6xl mx-auto px-4">
        <h1 className={`text-4xl font-bold mb-8 text-center ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
          Create New Content
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <CreateOption
            title="Create Blog Post"
            description="Write a new blog post for Impact Stories."
            link="/create/blog"
          />
          <CreateOption
            title="Create Feature Story"
            description="Create a new feature story for the homepage."
            link="/create/feature-story"
            disabled={contentExists['Feature Story']}
          />
          <CreateOption
            title="Add Team Member"
            description="Add a new team member to the 'Who We Are' section."
            link="/create/team-member"
          />
          <CreateOption
            title="Add Video"
            description="Upload a new video or add a YouTube link."
            link="/create/video"
          />
          <CreateOption
            title="Create 'What We Do' Info"
            description="Add new information to the 'What We Do' section."
            link="/create/what-we-do"
            disabled={contentExists['What We Do']}
          />
          <CreateOption
            title="Upload PDF"
            description="Upload a new PDF for the Research and Reports section."
            link="/create/pdf"
          />
          <CreateOption
            title="Add Photo"
            description="Upload a new photo for the Gallery section."
            link="/create/photo"
          />
          <CreateOption
            title="Create Contact Info"
            description="Add contact information for the Contact Us page."
            link="/create/contact-info"
          />
          <CreateOption
            title="Create Banner"
            description="Create a new banner for the homepage."
            link="/create/banner"
            disabled={contentExists['Banner']}
          />
        </div>
      </div>
    </div>
  );
}