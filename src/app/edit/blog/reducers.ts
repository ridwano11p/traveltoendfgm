import { BlogState, BlogAction } from './types';

export const initialState: BlogState = {
  blogs: [],
  loading: true,
  error: null,
  editingBlog: null,
  newImage: null,
  newVideo: null,
  isYouTubeVideo: false,
  youTubeUrl: '',
  tags: [],
  newTag: '',
  removedImage: false,
  removedVideo: false,
};

export function blogReducer(state: BlogState, action: BlogAction): BlogState {
  switch (action.type) {
    case 'SET_BLOGS':
      return { ...state, blogs: action.payload, loading: false };
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload, loading: false };
    case 'SET_EDITING_BLOG':
      return {
        ...state,
        editingBlog: action.payload,
        newImage: null,
        newVideo: null,
        isYouTubeVideo: action.payload?.isYouTubeVideo || false,
        youTubeUrl: action.payload?.videoUrl || '',
        tags: action.payload?.tags || [],
        removedImage: false,
        removedVideo: false,
      };
    case 'UPDATE_EDITING_BLOG':
      return {
        ...state,
        editingBlog: state.editingBlog
          ? { ...state.editingBlog, ...action.payload }
          : null,
      };
    case 'SET_NEW_IMAGE':
      return { ...state, newImage: action.payload, removedImage: false };
    case 'SET_NEW_VIDEO':
      return {
        ...state,
        newVideo: action.payload,
        removedVideo: false,
        isYouTubeVideo: false,
        youTubeUrl: '',
      };
    case 'SET_IS_YOUTUBE_VIDEO':
      return { ...state, isYouTubeVideo: action.payload };
    case 'SET_YOUTUBE_URL':
      return { ...state, youTubeUrl: action.payload };
    case 'SET_TAGS':
      return { ...state, tags: action.payload };
    case 'SET_NEW_TAG':
      return { ...state, newTag: action.payload };
    case 'ADD_TAG':
      return {
        ...state,
        tags: [...state.tags, action.payload],
        newTag: '',
      };
    case 'REMOVE_TAG':
      return {
        ...state,
        tags: state.tags.filter(tag => tag !== action.payload),
      };
    case 'SET_REMOVED_IMAGE':
      return { ...state, removedImage: action.payload, newImage: null };
    case 'SET_REMOVED_VIDEO':
      return {
        ...state,
        removedVideo: action.payload,
        newVideo: null,
        isYouTubeVideo: false,
        youTubeUrl: '',
      };
    default:
      return state;
  }
}