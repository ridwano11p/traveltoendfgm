export interface Photo {
    id: string;
    title: string;
    description: string;
    photoUrl: string;
    createdAt: string;
    updatedAt: string;
  }
  
  export interface EditingPhoto extends Photo {
    tempPhotoUrl: string | null;
  }
  
  export interface FormState {
    loading: boolean;
    error: string | null;
  }
  
  // Component Props
  export interface PhotoCardProps {
    photo: Photo;
    onEdit: (photo: Photo) => void;
    onDelete: (id: string) => void;
    isDark: boolean;
  }
  
  export interface PhotoListProps {
    photos: Photo[];
    onEdit: (photo: Photo) => void;
    onDelete: (id: string) => void;
    isDark: boolean;
  }
  
  export interface EditPhotoFormProps {
    photo: EditingPhoto;
    onUpdate: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
    onCancel: () => void;
    onImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onRemoveImage: () => void;
    removedImage: boolean;
    isDark: boolean;
  }
  
  // Action Types
  export type PhotoAction =
    | { type: 'SET_PHOTOS'; payload: Photo[] }
    | { type: 'SET_EDITING'; payload: EditingPhoto | null }
    | { type: 'UPDATE_PHOTO'; payload: Photo }
    | { type: 'DELETE_PHOTO'; payload: string }
    | { type: 'SET_ERROR'; payload: string | null }
    | { type: 'SET_LOADING'; payload: boolean }
    | { type: 'SET_REMOVED_IMAGE'; payload: boolean }
    | { type: 'SET_NEW_IMAGE'; payload: File | null };
  
  // State Interface
  export interface PhotoState {
    photos: Photo[];
    editingPhoto: EditingPhoto | null;
    newImage: File | null;
    removedImage: boolean;
    loading: boolean;
    error: string | null;
  }
  