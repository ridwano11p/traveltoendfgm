export const MAX_IMAGE_SIZE = 2 * 1024 * 1024; // 2MB

// Form Data Types
export interface WhatWeDoContent {
  mission: string;
  approach: string;
  impact: string;
  imageUrl: string;
  updatedAt: Date;
}

export interface WhatWeDoUpdateData {
  mission: string;
  approach: string;
  impact: string;
  imageUrl?: string;
  updatedAt: Date;
}

export interface FormState {
  loading: boolean;
  error: string | null;
}

// Component Props Types
export interface ContentEditorProps {
  content: WhatWeDoContent;
  onUpdate: (field: keyof WhatWeDoContent, value: string) => void;
  isDark: boolean;
}

export interface ImageEditorProps {
  currentImageUrl: string;
  onImageChange: (file: File | null) => void;
  error: string | null;
  isDark: boolean;
}

// API Response Types
export interface FetchResponse {
  success: boolean;
  data?: WhatWeDoContent;
  error?: string;
}

export interface UpdateResponse {
  success: boolean;
  error?: string;
}

// Image Processing Types
export interface ImageCompressionOptions {
  maxSizeMB: number;
  maxWidthOrHeight: number;
}
