// app/sitemap.ts
import type { MetadataRoute } from 'next';

// Force dynamic generation so updates are reflected on each request
export const dynamic = 'force-dynamic';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://traveltoendfgm.vercel.app';
  
  // In a real scenario, you might fetch updated dates or additional URLs from a CMS or database.
  // Here we reproduce your static sitemap entries dynamically.
  return [
    {
      url: baseUrl,
      lastModified: '2024-01-24',
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/home`,
      lastModified: '2024-01-24',
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/search`,
      lastModified: '2024-01-24',
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/impact-stories`,
      lastModified: '2024-01-24',
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/about/who-we-are`,
      lastModified: '2024-01-24',
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/about/what-we-do`,
      lastModified: '2024-01-24',
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/documentaries/videos`,
      lastModified: '2024-01-24',
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/research/pdfs`,
      lastModified: '2024-01-24',
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/gallery/photos`,
      lastModified: '2024-01-24',
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: '2024-01-24',
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/tag`,
      lastModified: '2024-01-24',
      changeFrequency: 'daily',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/article`,
      lastModified: '2024-01-24',
      changeFrequency: 'daily',
      priority: 0.8,
    },
  ];
}
