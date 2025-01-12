export interface Banner {
  id: string;
  title: string;
  description: string;
  mediaUrl: string;
  mediaType: 'image' | 'video' | 'youtube';
  isYouTube: boolean;
  youtubeId: string | null;
  updatedAt: Date;
}

export interface BannerState {
  banners: Banner[];
  loading: boolean;
  error: string | null;
  editingBanner: Banner | null;
  newMediaFile: File | null;
  isLocalMedia: boolean;
  tempYoutubeUrl: string;
}

type BannerActionType =
  | { type: 'SET_BANNERS'; payload: Banner[] }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'SET_EDITING_BANNER'; payload: Banner | null }
  | { type: 'UPDATE_EDITING_BANNER'; payload: Banner }
  | { type: 'SET_NEW_MEDIA_FILE'; payload: File | null }
  | { type: 'SET_IS_LOCAL_MEDIA'; payload: boolean }
  | { type: 'SET_TEMP_YOUTUBE_URL'; payload: string }
  | { type: 'REMOVE_BANNER'; payload: string };

export type BannerAction = BannerActionType;

export interface BannerCardProps {
  banner: Banner;
  onEdit: (banner: Banner) => void;
  onDelete: (bannerId: string) => void;
  isDark: boolean;
}

export interface BannerFormProps {
  state: BannerState;
  dispatch: React.Dispatch<BannerAction>;
  onCancel: () => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  isDark: boolean;
}

export interface MediaInputProps {
  isLocalMedia: boolean;
  onLocalMediaToggle: (isLocal: boolean) => void;
  onMediaFileChange: (file: File | null) => void;
  onYoutubeUrlChange: (url: string) => void;
  currentMedia: {
    url: string;
    type: string;
  } | null;
  youtubeUrl: string;
  isDark: boolean;
}