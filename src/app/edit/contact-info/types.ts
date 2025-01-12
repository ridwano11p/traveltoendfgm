// Contact Info Types
export interface ContactInfo {
    id: string;
    email: string;
    phone: string;
    location: string;
    createdAt: string;
    updatedAt: string;
  }
  
  export interface ContactFormData {
    email: string;
    phone: string;
    location: string;
  }
  
  export interface FormState {
    loading: boolean;
    updating: boolean;
    error: string | null;
    docId: string;
  }
  
  // Form Component Props
  export interface ContactFormProps {
    formData: ContactFormData;
    onChange: (field: keyof ContactFormData, value: string) => void;
    isDark: boolean;
  }
  
  export interface FormButtonsProps {
    updating: boolean;
    onCancel: () => void;
    isDark: boolean;
  }
  
  // API Response Types
  export interface ApiResponse<T = ContactInfo> {
    success: boolean;
    error?: string;
    data?: T;
  }
  
  // Form Validation Types
  export interface ValidationResult {
    isValid: boolean;
    error?: string;
  }
  
  // Loading State Types
  export interface LoadingState {
    isLoading: boolean;
    message?: string;
  }
  
  // Error State Types
  export interface ErrorState {
    hasError: boolean;
    message: string | null;
  }
  