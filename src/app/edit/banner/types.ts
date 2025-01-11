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

export interface BannerAction {
  type:
    | 'SET_BANNERS'
    | 'SET_LOADING'
    | 'SET_ERROR'
    | 'SET_EDITING_BANNER'
    | 'UPDATE_EDITING_BANNER'
    | 'SET_NEW_MEDIA_FILE'
    | 'SET_IS_LOCAL_MEDIA'
    | 'SET_TEMP_YOUTUBE_URL'
    | 'REMOVE_BANNER';
  payload: any;
}

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