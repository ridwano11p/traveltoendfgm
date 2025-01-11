// Form Types
export interface FeatureStoryFormData {
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
  
  // Component Props Types
  export interface TagInputProps {
    tags: string[];
    currentTag: string;
    onAddTag: (e: React.MouseEvent<HTMLButtonElement>) => void;
    onRemoveTag: (tag: string) => void;
    onTagChange: (value: string) => void;
    isDark: boolean;
  }
  
  export interface MediaInputProps {
    isYouTubeVideo: boolean;
    youTubeUrl: string;
    onYouTubeChange: (value: string) => void;
    onVideoChange: (file: File | null) => void;
    onImageChange: (file: File | null) => void;
    onToggleYouTube: () => void;
    isDark: boolean;
  }
  
  export interface FormInputProps {
    id: string;
    label: string;
    value: string;
    onChange: (value: string) => void;
    required?: boolean;
    minLength?: number;
    type?: string;
    isDark: boolean;
  }
  
  export interface FormTextAreaProps extends Omit<FormInputProps, 'type'> {
    rows?: number;
  }
  
  export interface SubmitButtonProps {
    loading: boolean;
    isDark: boolean;
  }
  
  // Data Types
  export interface FeatureStory {
    id: string;
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
  
  // Validation Types
  export interface ValidationResult {
    isValid: boolean;
    error?: string;
  }
  
  export interface YouTubeValidationResult {
    isValid: boolean;
    videoId?: string;
  }
  