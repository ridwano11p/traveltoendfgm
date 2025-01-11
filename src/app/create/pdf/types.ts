export interface PDFFormData {
    title: string;
    description: string;
    pdfFile: File | null;
  }
  
  export interface FormState {
    loading: boolean;
    error: string | null;
  }
  
  export interface PDFData {
    id: string;
    title: string;
    description: string;
    pdfUrl: string;
    fileName: string;
    createdAt: Date;
    updatedAt: Date;
  }
  
  export interface PDFUploadProps {
    onFileChange: (file: File | null) => void;
    isDark: boolean;
  }
  
  export interface FormButtonsProps {
    loading: boolean;
    isDark: boolean;
    onCancel: () => void;
  }
  
  export const MAX_PDF_SIZE = 10 * 1024 * 1024; // 10MB
  