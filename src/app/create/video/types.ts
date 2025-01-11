export interface VideoFormData {
    title: string;
    description: string;
    videoFile: File | null;
    youtubeUrl: string;
    thumbnail: File | null;
    isLocalVideo: boolean;
  }
  
  export interface FormState {
    loading: boolean;
    error: string | null;
  }
  
  export interface VideoData {
    title: string;
    description: string;
    videoUrl: string;
    thumbnailUrl: string | null;
    isYouTube: boolean;
    youtubeId: string | null;
    createdAt: Date;
    updatedAt: Date;
  }
  
  export interface VideoUploadProps {
    onVideoChange: (file: File | null) => void;
    onThumbnailChange: (file: File | null) => void;
    isDark: boolean;
  }
  
  export interface YouTubeInputProps {
    value: string;
    onChange: (value: string) => void;
    isDark: boolean;
  }
  
  export interface VideoTypeToggleProps {
    isLocalVideo: boolean;
    onToggle: (isLocal: boolean) => void;
    isDark: boolean;
  }
  