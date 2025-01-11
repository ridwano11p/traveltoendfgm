export interface BlogFormData {
    title: string;
    content: string;
    author: string;
    image: File | null;
    video: File | null;
    isYouTubeVideo: boolean;
    youTubeUrl: string;
    tags: string[];
    currentTag: string;
  }
  
  export interface FormState {
    loading: boolean;
    error: string | null;
  }
  
  export interface BlogData {
    title: string;
    content: string;
    author: string;
    imageUrl: string | null;
    videoUrl: string | null;
    youtubeId: string | null;
    isYouTubeVideo: boolean;
    tags: string[];
    createdAt: Date;
    updatedAt: Date;
  }
  