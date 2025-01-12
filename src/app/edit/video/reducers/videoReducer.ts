import { EditVideoState, EditVideoAction } from '../types';

export const initialState: EditVideoState = {
  videos: [],
  loading: true,
  error: null,
  editingVideo: null,
  newVideoFile: null,
  newThumbnail: null,
  isLocalVideo: true,
  tempYoutubeUrl: '',
};

export function videoReducer(state: EditVideoState, action: EditVideoAction): EditVideoState {
  switch (action.type) {
    case 'SET_VIDEOS':
      return { ...state, videos: action.payload, loading: false };

    case 'SET_LOADING':
      return { ...state, loading: action.payload };

    case 'SET_ERROR':
      return { ...state, error: action.payload, loading: false };

    case 'SET_EDITING_VIDEO':
      return {
        ...state,
        editingVideo: action.payload,
        newVideoFile: null,
        newThumbnail: null,
        isLocalVideo: action.payload ? !action.payload.isYouTube : true,
        tempYoutubeUrl: action.payload?.youtubeUrl || '',
      };

    case 'UPDATE_EDITING_VIDEO':
      return {
        ...state,
        editingVideo: state.editingVideo
          ? { ...state.editingVideo, ...action.payload }
          : null,
      };

    case 'SET_NEW_VIDEO_FILE':
      return { ...state, newVideoFile: action.payload };

    case 'SET_NEW_THUMBNAIL':
      return { ...state, newThumbnail: action.payload };

    case 'SET_IS_LOCAL_VIDEO':
      return { ...state, isLocalVideo: action.payload };

    case 'SET_TEMP_YOUTUBE_URL':
      return { ...state, tempYoutubeUrl: action.payload };

    case 'REMOVE_VIDEO':
      return {
        ...state,
        newVideoFile: null,
        newThumbnail: null,
        tempYoutubeUrl: '',
      };

    default:
      return state;
  }
}
