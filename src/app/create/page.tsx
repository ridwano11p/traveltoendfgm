"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useTheme } from "@/context/ThemeContext";
import { getContentExistence } from "@/utils/contentChecks";

interface CreateOptionProps {
  title: string;
  description: string;
  link: string;
  disabled?: boolean;
}

const CreateOption = ({ title, description, link, disabled }: CreateOptionProps) => {
  const { theme } = useTheme();

  if (disabled) {
    return (
      <div className={`block p-6 rounded-lg shadow-md ${
        theme === "dark" ? "bg-gray-700" : "bg-gray-200"
      } opacity-50 cursor-not-allowed`}>
        <h3 className={`text-xl font-semibold mb-2 ${
          theme === "dark" ? "text-white" : "text-gray-800"
        }`}>
          {title}
        </h3>
        <p className={`${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}>
          {description}
        </p>
      </div>
    );
  }

  return (
    <Link
      href={link}
      className={`block p-6 rounded-lg shadow-md ${
        theme === "dark"
          ? "bg-gray-800 hover:bg-gray-700"
          : "bg-[#90d2dc] hover:bg-[#7fbfcc]"
      } transition duration-300`}
    >
      <h3 className={`text-xl font-semibold mb-2 ${
        theme === "dark" ? "text-white" : "text-gray-800"
      }`}>
        {title}
      </h3>
      <p className={`${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}>
        {description}
      </p>
    </Link>
  );
};

export default function Create() {
  const { theme } = useTheme();
  const [contentExists, setContentExists] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const fetchContentExistence = async () => {
      const existence = await getContentExistence();
      setContentExists(existence);
    };

    fetchContentExistence();
  }, []);

  return (
    <div className={`min-h-screen py-12 ${
      theme === "dark" ? "bg-gray-900" : "bg-[#90d2dc]"
    }`}>
      <div className="max-w-6xl mx-auto px-4">
        <h1 className={`text-4xl font-bold mb-8 text-center ${
          theme === "dark" ? "text-white" : "text-gray-800"
        }`}>
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
            disabled={contentExists["Feature Story"]}
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
            disabled={contentExists["What We Do"]}
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
            disabled={contentExists["Banner"]}
          />
        </div>
      </div>
    </div>
  );
}