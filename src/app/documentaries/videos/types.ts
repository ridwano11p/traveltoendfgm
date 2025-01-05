export interface Video {
  id: string;
  title: string;
  description: string;
  isYouTube: boolean;
  youtubeId: string; // Remove optional
  videoUrl: string; // Remove optional
  thumbnailUrl?: string;
  createdAt?: string;
  updatedAt?: string;
}
