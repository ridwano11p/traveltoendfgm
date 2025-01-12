export interface FeatureStory {
  id: string;
  title: string;
  content: string;
  imageUrl?: string;
  videoUrl?: string;
  isYouTubeVideo?: boolean;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface UpdateFeatureStoryData {
  title: string;
  content: string;
  tags: string[];
  imageUrl?: string | null;
  videoUrl?: string | null;
  isYouTubeVideo?: boolean;
  updatedAt: Date;
}

export interface FeatureStoryState {
  stories: FeatureStory[];
  loading: boolean;
  error: string | null;
  editingStory: FeatureStory | null;
  newImage: File | null;
  newVideo: File | null;
  isYouTubeVideo: boolean;
  youTubeUrl: string;
  tags: string[];
  newTag: string;
  removedImage: boolean;
  removedVideo: boolean;
}

export type FeatureStoryAction =
  | { type: 'SET_STORIES'; payload: FeatureStory[] }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'SET_EDITING_STORY'; payload: FeatureStory | null }
  | { type: 'UPDATE_EDITING_STORY'; payload: Partial<FeatureStory> }
  | { type: 'SET_NEW_IMAGE'; payload: File | null }
  | { type: 'SET_NEW_VIDEO'; payload: File | null }
  | { type: 'SET_IS_YOUTUBE_VIDEO'; payload: boolean }
  | { type: 'SET_YOUTUBE_URL'; payload: string }
  | { type: 'SET_TAGS'; payload: string[] }
  | { type: 'SET_NEW_TAG'; payload: string }
  | { type: 'ADD_TAG'; payload: string }
  | { type: 'REMOVE_TAG'; payload: string }
  | { type: 'SET_REMOVED_IMAGE'; payload: boolean }
  | { type: 'SET_REMOVED_VIDEO'; payload: boolean };

export interface FeatureStoryListProps {
  stories: FeatureStory[];
  onEdit: (story: FeatureStory) => void;
  onDelete: (story: FeatureStory) => void;
  isDark: boolean;
}

export interface FeatureStoryFormProps {
  state: FeatureStoryState;
  dispatch: React.Dispatch<FeatureStoryAction>;
  onUpdate: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  onCancel: () => void;
  isDark: boolean;
}