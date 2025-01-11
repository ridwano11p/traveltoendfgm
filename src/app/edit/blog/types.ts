export interface Blog {
  id: string;
  title: string;
  content: string;
  author: string;
  imageUrl?: string;
  videoUrl?: string;
  isYouTubeVideo?: boolean;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface BlogState {
  blogs: Blog[];
  loading: boolean;
  error: string | null;
  editingBlog: Blog | null;
  newImage: File | null;
  newVideo: File | null;
  isYouTubeVideo: boolean;
  youTubeUrl: string;
  tags: string[];
  newTag: string;
  removedImage: boolean;
  removedVideo: boolean;
}

export type BlogAction =
  | { type: 'SET_BLOGS'; payload: Blog[] }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'SET_EDITING_BLOG'; payload: Blog | null }
  | { type: 'UPDATE_EDITING_BLOG'; payload: Partial<Blog> }
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

export interface BlogCardProps {
  blog: Blog;
  onEdit: (blog: Blog) => void;
  onDelete: (blogId: string) => void;
  isDark: boolean;
}

export interface BlogFormProps {
  blog: Blog;
  state: BlogState;
  dispatch: React.Dispatch<BlogAction>;
  onCancel: () => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  isDark: boolean;
}

export interface MediaSectionProps {
  state: BlogState;
  dispatch: React.Dispatch<BlogAction>;
  isDark: boolean;
}

export interface TagSectionProps {
  tags: string[];
  newTag: string;
  onAddTag: () => void;
  onRemoveTag: (tag: string) => void;
  onNewTagChange: (value: string) => void;
  isDark: boolean;
}