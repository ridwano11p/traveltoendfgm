// app/robots.ts
import type { MetadataRoute } from 'next';

// Force dynamic generation so changes in rules or site structure are reflected immediately
export const dynamic = 'force-dynamic';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      // Allow access to these public pages
      allow: [
        '/',
        '/home',
        '/impact-stories',
        '/about/who-we-are',
        '/about/what-we-do',
        '/documentaries/videos',
        '/research/pdfs',
        '/gallery/photos',
        '/contact',
        '/tag',
        '/article',
        '/search',
      ],
      // Block admin and creation pages
      disallow: [
        '/create/',
        '/edit/',
        '/login',
        '/admin',
      ],
      // Optionally, you can also add a crawl delay if needed:
      // crawlDelay: 10,
    },
    sitemap: 'https://traveltoendfgm.vercel.app/sitemap.xml',
  };
}
