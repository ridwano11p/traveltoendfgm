export interface ArticleData {
    id: string;
    title: string;
    content: string;
    author?: string;
    date?: string;
    imageUrl?: string;
    videoUrl?: string;
    isYouTubeVideo?: boolean;
    tags?: string[];
    description?: string;
    createdAt?: string;
    updatedAt?: string;
  }
  
  export interface MediaContentProps {
    imageUrl?: string;
    videoUrl?: string;
    isYouTubeVideo?: boolean;
    title: string;
  }
  
  export interface ArticleClientProps {
    article: ArticleData;
  }
  