import { BannerState, BannerAction } from './types';

export const initialState: BannerState = {
  banners: [],
  loading: true,
  error: null,
  editingBanner: null,
  newMediaFile: null,
  isLocalMedia: true,
  tempYoutubeUrl: '',
};

export function bannerReducer(state: BannerState, action: BannerAction): BannerState {
  switch (action.type) {
    case 'SET_BANNERS':
      return { ...state, banners: action.payload, loading: false };
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload, loading: false };
    case 'SET_EDITING_BANNER':
      return {
        ...state,
        editingBanner: action.payload,
        newMediaFile: null,
        isLocalMedia: action.payload ? action.payload.mediaType !== 'youtube' : true,
        tempYoutubeUrl: action.payload && action.payload.mediaType === 'youtube' ? action.payload.mediaUrl : '',
      };
    case 'UPDATE_EDITING_BANNER':
      return {
        ...state,
        editingBanner: state.editingBanner
          ? { ...state.editingBanner, ...action.payload }
          : null,
      };
    case 'SET_NEW_MEDIA_FILE':
      return { ...state, newMediaFile: action.payload };
    case 'SET_IS_LOCAL_MEDIA':
      return { ...state, isLocalMedia: action.payload };
    case 'SET_TEMP_YOUTUBE_URL':
      return { ...state, tempYoutubeUrl: action.payload };
    case 'REMOVE_BANNER':
      return {
        ...state,
        banners: state.banners.filter(banner => banner.id !== action.payload),
      };
    default:
      return state;
  }
}