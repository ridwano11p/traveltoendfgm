export interface Article {
    id: string;
    title: string;
    content: string;
    author?: string;
    date?: string;
    imageUrl?: string;
    videoUrl?: string;
    isYouTubeVideo?: boolean;
    tags?: string[];
    createdAt: Date;
    updatedAt: Date;
  }
  
  // Component Props Types
  export interface MediaContentProps {
    imageUrl?: string;
    videoUrl?: string;
    isYouTubeVideo?: boolean;
    title: string;
  }
  
  export interface ArticleHeaderProps {
    title: string;
    author?: string;
    date?: string;
    tags?: string[];
    isDark: boolean;
  }
  
  export interface ArticleContentProps {
    content: string;
    isDark: boolean;
  }
  
  export interface ArticleClientProps {
    article: Article;
  }
  
  // Page Props
  export interface ArticlePageProps {
    params: {
      id: string;
    };
  }
  
  // API Response Types
  export interface ArticleResponse {
    success: boolean;
    data?: Article;
    error?: string;
  }
  
  // SEO Types
  export interface ArticleMetadata {
    title: string;
    description: string;
    author?: string;
    publishedTime?: string;
    modifiedTime?: string;
    tags?: string[];
    imageUrl?: string;
  }
  