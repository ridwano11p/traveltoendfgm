"use client";

import Image from "next/image";
import { useTheme } from "@/context/ThemeContext";

interface WhatWeDoContent {
  mission: string;
  approach: string;
  impact: string;
  imageUrl?: string;
}

interface WhatWeDoClientProps {
  content: WhatWeDoContent;
}

export default function WhatWeDoClient({ content }: WhatWeDoClientProps) {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <div className={`min-h-screen ${isDark ? "bg-gray-900 text-white" : "bg-[#90d2dc] text-gray-800"}`}>
      <div className="max-w-6xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-8 text-center">
          What We Do
        </h1>
        
        <div className="flex flex-col md:flex-row gap-8">
          <div className={`prose ${isDark ? "prose-invert" : ""} max-w-none md:w-2/3`}>
            <h2 className="text-2xl font-semibold mb-4">
              Our Mission
            </h2>
            <p className="mb-6 whitespace-pre-wrap">
              {content.mission}
            </p>
            
            <h2 className="text-2xl font-semibold mb-4">
              Our Approach
            </h2>
            <p className="mb-6 whitespace-pre-wrap">
              {content.approach}
            </p>
            
            <h2 className="text-2xl font-semibold mb-4">
              Our Impact
            </h2>
            <p className="mb-6 whitespace-pre-wrap">
              {content.impact}
            </p>
          </div>

          <div className="md:w-1/3">
            {content.imageUrl && (
              <div className="w-full aspect-[3/4] relative rounded-lg shadow-md overflow-hidden">
                <Image
                  src={content.imageUrl}
                  alt="Our Work"
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover"
                  priority
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}