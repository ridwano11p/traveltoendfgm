"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useTheme } from "@/context/ThemeContext";
import { getContentExistence } from "@/utils/contentChecks";

interface EditOptionProps {
  title: string;
  description: string;
  link: string;
  disabled?: boolean;
}

const EditOption = ({ title, description, link, disabled }: EditOptionProps) => {
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
          : "bg-white hover:bg-gray-50"
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

export default function Edit() {
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
          Edit Content
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <EditOption
            title="Edit Blog Posts"
            description="Edit or delete existing blog posts in Impact Stories."
            link="/edit/blogs"
          />
          <EditOption
            title="Edit Feature Stories"
            description="Update or remove feature stories from the homepage."
            link="/edit/feature-story"
          />
          <EditOption
            title="Edit Team Members"
            description="Update or remove team members from the 'Who We Are' section."
            link="/edit/team-members"
          />
          <EditOption
            title="Edit Videos"
            description="Update or remove videos from the Documentaries section."
            link="/edit/videos"
          />
          <EditOption
            title="Edit 'What We Do' Info"
            description="Update information in the 'What We Do' section."
            link="/edit/what-we-do"
            disabled={!contentExists["What We Do"]}
          />
          <EditOption
            title="Edit PDFs"
            description="Update or remove PDFs from the Research and Reports section."
            link="/edit/pdfs"
          />
          <EditOption
            title="Edit Photos"
            description="Update or remove photos from the Gallery section."
            link="/edit/photos"
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
            disabled={!contentExists["Banner"]}
          />
        </div>
      </div>
    </div>
  );
}