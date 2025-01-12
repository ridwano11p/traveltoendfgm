// Firestore Types
export interface FirestoreVideo {
  id: string;
  title: string;
  description: string;
  videoUrl: string | null;
  thumbnailUrl: string | null;
  isYouTube: boolean;
  youtubeUrl?: string;
  youtubeId?: string;
  createdAt: { seconds: number; nanoseconds: number };
  updatedAt: { seconds: number; nanoseconds: number };
}

// Update Data Type
export interface VideoUpdateData {
  title: string;
  description: string;
  isYouTube: boolean;
  videoUrl?: string | null;
  thumbnailUrl?: string | null;
  youtubeUrl?: string | null;
  youtubeId?: string | null;
  updatedAt: Date;
  createdAt?: Date;
}

// State Types
export interface EditVideoState {
    videos: Video[];
    loading: boolean;
    error: string | null;
    editingVideo: Video | null;
    newVideoFile: File | null;
    newThumbnail: File | null;
    isLocalVideo: boolean;
    tempYoutubeUrl: string;
  }
  
  export type EditVideoAction =
    | { type: 'SET_VIDEOS'; payload: Video[] }
    | { type: 'SET_LOADING'; payload: boolean }
    | { type: 'SET_ERROR'; payload: string | null }
    | { type: 'SET_EDITING_VIDEO'; payload: Video | null }
    | { type: 'UPDATE_EDITING_VIDEO'; payload: Partial<Video> }
    | { type: 'SET_NEW_VIDEO_FILE'; payload: File | null }
    | { type: 'SET_NEW_THUMBNAIL'; payload: File | null }
    | { type: 'SET_IS_LOCAL_VIDEO'; payload: boolean }
    | { type: 'SET_TEMP_YOUTUBE_URL'; payload: string }
    | { type: 'REMOVE_VIDEO' };
  
  // Data Types
  export interface Video {
    id: string;
    title: string;
    description: string;
    videoUrl: string | null;
    thumbnailUrl: string | null;
    isYouTube: boolean;
    youtubeUrl?: string;
    youtubeId?: string;
    createdAt: Date;
    updatedAt: Date;
  }
  
  // Component Props Types
  export interface VideoFormProps {
    video: Video;
    isLocalVideo: boolean;
    tempYoutubeUrl: string;
    newVideoFile: File | null;
    newThumbnail: File | null;
    isDark: boolean;
    onUpdate: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
    onCancel: () => void;
    onRemoveVideo: () => void;
    dispatch: React.Dispatch<EditVideoAction>;
  }
  
  export interface VideoCardProps {
    video: Video;
    isDark: boolean;
    onEdit: (video: Video) => void;
    onDelete: (id: string) => void;
  }
  
  export interface VideoTypeToggleProps {
    isLocalVideo: boolean;
    onChange: (isLocal: boolean) => void;
    isDark: boolean;
  }
  
  export interface MediaInputsProps {
    isLocalVideo: boolean;
    tempYoutubeUrl: string;
    onVideoChange: (file: File | null) => void;
    onThumbnailChange: (file: File | null) => void;
    onYoutubeUrlChange: (url: string) => void;
    isDark: boolean;
  }
  
  // Utility Types
  export interface YouTubeValidation {
    isValid: boolean;
    videoId: string | null;
  }
  
  export interface ThumbnailGenerationOptions {
    captureTime?: number;
    quality?: number;
    type?: string;
  }
  