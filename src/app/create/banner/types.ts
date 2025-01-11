export interface BannerFormData {
    title: string;
    description: string;
    mediaFile: File | null;
    youtubeUrl: string;
    isLocalMedia: boolean;
  }
  
  export interface Banner {
    id: string;
    title: string;
    description: string;
    mediaUrl: string;
    mediaType: 'image' | 'video' | 'youtube';
    isYouTube: boolean;
    youtubeId: string | null;
    createdAt: Date;
    updatedAt: Date;
  }
  
  export interface CreateBannerClientProps {
    onSubmit?: () => void;
  }
  
  // Form State Types
  export interface FormState {
    loading: boolean;
    error: string | null;
  }
  
  // YouTube Validation Types
  export interface YouTubeValidationResult {
    isValid: boolean;
    videoId?: string;
  }
  