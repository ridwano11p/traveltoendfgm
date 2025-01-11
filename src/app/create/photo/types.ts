export interface PhotoFormData {
    title: string;
    description: string;
    photo: File | null;
  }
  
  export interface FormState {
    loading: boolean;
    error: string | null;
  }
  
  export interface PhotoUploadProps {
    onFileChange: (file: File | null) => void;
    isDark: boolean;
  }
  
  export interface FormButtonsProps {
    loading: boolean;
    isDark: boolean;
    onCancel: () => void;
  }
  
  export interface PhotoData {
    id: string;
    title: string;
    description: string;
    photoUrl: string;
    createdAt: Date;
    updatedAt: Date;
  }
  