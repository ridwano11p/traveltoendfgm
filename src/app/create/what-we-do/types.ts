export const MAX_IMAGE_SIZE = 2 * 1024 * 1024; // 2MB

export interface WhatWeDoFormData {
  mission: string;
  approach: string;
  impact: string;
  image: File | null;
}

export interface FormState {
  loading: boolean;
  error: string | null;
}

export interface ContentInputProps {
  id: 'mission' | 'approach' | 'impact';
  label: string;
  value: string;
  onChange: (value: string) => void;
  isDark: boolean;
}

export interface ImageUploadProps {
  onImageChange: (file: File | null) => void;
  isDark: boolean;
  error: string | null;
}

export interface WhatWeDoData {
  mission: string;
  approach: string;
  impact: string;
  imageUrl: string;
  updatedAt: Date;
}
