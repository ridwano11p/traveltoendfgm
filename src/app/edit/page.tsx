"use client";

import { useEffect, useState } from 'react';
import { useTheme } from '@/context/ThemeContext';
import { getContentExistence } from '@/utils/contentChecks';
import EditOption from '@/components/shared/EditOption';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';

interface ContentExistence {
  [key: string]: boolean;
}

export default function EditPage() {
  const { theme } = useTheme();
  const router = useRouter();
  const { user } = useAuth();
  const [contentExists, setContentExists] = useState<ContentExistence>({});

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
          Edit Content
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <EditOption
            title="Edit Blog Posts"
            description="Edit or delete existing blog posts in Impact Stories."
            link="/edit/blog"
          />
          <EditOption
            title="Edit Feature Stories"
            description="Update or remove feature stories from the homepage."
            link="/edit/feature-story"
          />
          <EditOption
            title="Edit Team Members"
            description="Update or remove team members from the 'Who We Are' section."
            link="/edit/team-member"
          />
          <EditOption
            title="Edit Videos"
            description="Update or remove videos from the Documentaries section."
            link="/edit/video"
          />
          <EditOption
            title="Edit 'What We Do' Info"
            description="Update information in the 'What We Do' section."
            link="/edit/what-we-do"
            disabled={!contentExists['What We Do']}
          />
          <EditOption
            title="Edit PDFs"
            description="Update or remove PDFs from the Research and Reports section."
            link="/edit/pdf"
          />
          <EditOption
            title="Edit Photos"
            description="Update or remove photos from the Gallery section."
            link="/edit/photo"
          />
          <EditOption
            title="Edit Contact Info"
            description="Update contact information for the Contact Us page."
            link="/edit/contact-info"
          />
          <EditOption
            title="Edit Banner"
            description="Update or remove the banner from the homepage."
            link="/edit/banner"
            disabled={!contentExists['Banner']}
          />
        </div>
      </div>
    </div>
  );
}