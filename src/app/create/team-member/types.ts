export const MAX_IMAGE_SIZE = 1 * 1024 * 1024; // 1MB

export interface TeamMemberFormData {
  name: string;
  role: string;
  bio: string;
  image: File | null;
  linkedin: string;
  twitter: string;
  youtube: string;
  facebook: string;
}

export interface FormState {
  loading: boolean;
  error: string | null;
}

export interface TeamMemberData {
  id: string;
  name: string;
  role: string;
  bio: string;
  imageUrl: string;
  linkedin?: string;
  twitter?: string;
  youtube?: string;
  facebook?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ImageUploadProps {
  onFileChange: (file: File | null) => void;
  isDark: boolean;
  error: string | null;
}

export interface SocialMediaInputsProps {
  formData: {
    linkedin: string;
    twitter: string;
    youtube: string;
    facebook: string;
  };
  onChange: (field: string, value: string) => void;
  isDark: boolean;
}

export interface FormButtonsProps {
  loading: boolean;
  isDark: boolean;
  onCancel: () => void;
}
