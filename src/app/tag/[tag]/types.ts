export interface Post {
    id: string;
    type: 'blog' | 'featureStory';
    title: string;
    content: string;
    imageUrl?: string;
    videoUrl?: string;
    isYouTubeVideo?: boolean;
    tags: string[];
    createdAt: string;
    updatedAt?: string;
  }
  
  export interface MediaPreviewProps {
    post: Post;
    isDark: boolean;
  }
  
  export interface TagClientProps {
    posts: Post[];
    tag: string;
  }
  