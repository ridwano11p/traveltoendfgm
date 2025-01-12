export const MAX_PDF_SIZE = 10 * 1024 * 1024; // 10MB

// PDF Data Types
export interface PDF {
  id: string;
  title: string;
  description: string;
  pdfUrl: string;
  fileName: string;
  storageFileName?: string;
  createdAt: string;
  updatedAt: string;
}

export interface EditingPDF extends PDF {
  newFile?: File | null;
}

// Form State Types
export interface FormState {
  loading: boolean;
  updating: boolean;
  error: string | null;
}

// Component Props Types
export interface PDFCardProps {
  pdf: PDF;
  onEdit: (pdf: PDF) => void;
  onDelete: (id: string) => void;
  isDark: boolean;
}

export interface EditFormProps {
  pdf: EditingPDF;
  onUpdate: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  onCancel: () => void;
  onFileChange: (file: File | null) => void;
  updating: boolean;
  isDark: boolean;
}

// Function Types
export interface ValidationResult {
  isValid: boolean;
  error?: string;
}

// Storage Types
export interface StorageOperation {
  success: boolean;
  error?: string;
  url?: string;
}

// API Response Types
export interface PDFListResponse {
  pdfs: PDF[];
  total: number;
}

export interface UpdatePDFResponse {
  success: boolean;
  error?: string;
  pdf?: PDF;
}

export interface DeletePDFResponse {
  success: boolean;
  error?: string;
}