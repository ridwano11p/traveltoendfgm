export interface ContactFormData {
    email: string;
    phone: string;
    location: string;
  }
  
  export interface FormState {
    loading: boolean;
    error: string | null;
  }
  