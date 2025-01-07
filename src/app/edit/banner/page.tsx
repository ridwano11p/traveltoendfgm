"use client";

import { useReducer, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useTheme } from '@/context/ThemeContext';
import { useAuth } from '@/context/AuthContext';
import { db, storage } from '@/lib/firebase/config';
import { collection, query, getDocs, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { FaSpinner, FaEdit, FaTrash, FaImage, FaVideo, FaYoutube } from 'react-icons/fa';
import Image from 'next/image';

interface Banner {
  id: string;
  title: string;
  description: string;
  mediaUrl: string;
  mediaType: 'image' | 'video' | 'youtube';
  isYouTube?: boolean;
  youtubeId?: string | undefined;
  createdAt?: Date;
  updatedAt?: Date;
}

interface State {
  banners: Banner[];
  loading: boolean;
  error: string | null;
  editingBanner: Banner | null;
  newMediaFile: File | null;
  isLocalMedia: boolean;
  tempYoutubeUrl: string;
}

type Action =
  | { type: 'SET_BANNERS'; payload: Banner[] }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'SET_EDITING_BANNER'; payload: Banner | null }
  | { type: 'UPDATE_EDITING_BANNER'; payload: Partial<Banner> }
  | { type: 'SET_NEW_MEDIA_FILE'; payload: File | null }
  | { type: 'SET_IS_LOCAL_MEDIA'; payload: boolean }
  | { type: 'SET_TEMP_YOUTUBE_URL'; payload: string }
  | { type: 'REMOVE_BANNER'; payload: string };

const initialState: State = {
  banners: [],
  loading: true,
  error: null,
  editingBanner: null,
  newMediaFile: null,
  isLocalMedia: true,
  tempYoutubeUrl: '',
};

function reducer(state: State, action: Action): State {
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

export default function EditBanner() {
  const { theme } = useTheme();
  const { user } = useAuth();
  const router = useRouter();
  const [state, dispatch] = useReducer(reducer, initialState);
  const isDark = theme === 'dark';

  useEffect(() => {
    if (!user) {
      router.push('/login');
      return;
    }
    fetchBanners();
  }, [user, router]);

  const fetchBanners = async () => {
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      const q = query(collection(db, 'banners'));
      const querySnapshot = await getDocs(q);
      const fetchedBanners = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Banner[];
      dispatch({ type: 'SET_BANNERS', payload: fetchedBanners });
    } catch (err) {
      console.error("Error fetching banners: ", err);
      dispatch({ type: 'SET_ERROR', payload: "Failed to fetch banners. Please try again." });
    }
  };

  const handleEdit = (banner: Banner) => {
    dispatch({ type: 'SET_EDITING_BANNER', payload: banner });
  };

  const handleMediaFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      dispatch({ type: 'SET_NEW_MEDIA_FILE', payload: file });
    }
  };

  const validateYouTubeUrl = (url: string): boolean => {
    const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/(watch\?v=)?([a-zA-Z0-9_-]{11})$/;
    return youtubeRegex.test(url);
  };

  const extractYoutubeId = (url: string): string | undefined => {
    const match = url.match(/(?:https?:\/\/)?(?:www\.)?(?:youtube\.com|youtu\.be)\/(?:watch\?v=)?([a-zA-Z0-9_-]{11})/);
    return match ? match[1] : undefined;
  };

  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!state.editingBanner) return;

    dispatch({ type: 'SET_LOADING', payload: true });
    dispatch({ type: 'SET_ERROR', payload: null });

    if (state.editingBanner.title.trim().length < 3) {
      dispatch({ type: 'SET_ERROR', payload: "Title must be at least 3 characters long." });
      return;
    }

    if (state.editingBanner.description.trim().length < 10) {
      dispatch({ type: 'SET_ERROR', payload: "Description must be at least 10 characters long." });
      return;
    }

    if (!state.isLocalMedia && !validateYouTubeUrl(state.tempYoutubeUrl)) {
      dispatch({ type: 'SET_ERROR', payload: "Please provide a valid YouTube URL." });
      return;
    }

    try {
      const bannerRef = doc(db, 'banners', state.editingBanner.id);
      let updateData: Partial<Banner> & { updatedAt: Date } = {
        title: state.editingBanner.title.trim(),
        description: state.editingBanner.description.trim(),
        updatedAt: new Date()
      };

      if (state.isLocalMedia) {
        if (state.newMediaFile) {
          if (state.editingBanner.mediaUrl && state.editingBanner.mediaType !== 'youtube') {
            try {
              const oldMediaRef = ref(storage, state.editingBanner.mediaUrl);
              await deleteObject(oldMediaRef);
            } catch (error) {
              console.error("Error deleting old media:", error);
            }
          }

          const mediaRef = ref(storage, `bannerstorage/${Date.now()}_${state.newMediaFile.name}`);
          await uploadBytes(mediaRef, state.newMediaFile);
          const mediaUrl = await getDownloadURL(mediaRef);
          updateData.mediaUrl = mediaUrl;
          updateData.mediaType = state.newMediaFile.type.startsWith('image/') ? 'image' : 'video';
        }

        updateData.isYouTube = false;
        updateData.youtubeId = undefined;
      } else {
        if (state.editingBanner.mediaUrl && state.editingBanner.mediaType !== 'youtube') {
          try {
            const oldMediaRef = ref(storage, state.editingBanner.mediaUrl);
            await deleteObject(oldMediaRef);
          } catch (error) {
            console.error("Error deleting old media:", error);
          }
        }

        const youtubeId = extractYoutubeId(state.tempYoutubeUrl);
        updateData.mediaUrl = state.tempYoutubeUrl;
        updateData.mediaType = 'youtube';
        updateData.isYouTube = true;
        updateData.youtubeId = youtubeId;
      }

      await updateDoc(bannerRef, updateData);
      dispatch({ type: 'SET_EDITING_BANNER', payload: null });
      fetchBanners();
    } catch (err) {
      console.error("Error updating banner: ", err);
      dispatch({ type: 'SET_ERROR', payload: "Failed to update banner. Please try again." });
    }
  };

  const handleDelete = async (bannerId: string) => {
    if (window.confirm("Are you sure you want to delete this banner?")) {
      dispatch({ type: 'SET_LOADING', payload: true });
      try {
        const bannerToDelete = state.banners.find(b => b.id === bannerId);

        if (bannerToDelete?.mediaUrl && bannerToDelete.mediaType !== 'youtube') {
          try {
            const mediaRef = ref(storage, bannerToDelete.mediaUrl);
            await deleteObject(mediaRef);
          } catch (error) {
            console.error("Error deleting media:", error);
          }
        }

        await deleteDoc(doc(db, 'banners', bannerId));
        dispatch({ type: 'REMOVE_BANNER', payload: bannerId });
        dispatch({ type: 'SET_LOADING', payload: false });
      } catch (err) {
        console.error("Error deleting banner: ", err);
        dispatch({ type: 'SET_ERROR', payload: "Failed to delete banner. Please try again." });
      }
    }
  };

  if (state.loading) {
    return (
      <div className={`flex justify-center items-center h-screen ${isDark ? 'bg-gray-900' : 'bg-[#90d2dc]'}`}>
        <FaSpinner className={`animate-spin text-6xl ${isDark ? 'text-white' : 'text-gray-800'}`} />
      </div>
    );
  }

  return (
    <div className={`min-h-screen py-12 ${isDark ? 'bg-gray-900' : 'bg-[#90d2dc]'}`}>
      <div className="max-w-6xl mx-auto px-4">
        <h1 className={`text-4xl font-bold mb-8 text-center ${isDark ? 'text-white' : 'text-gray-800'}`}>
          Edit Banners
        </h1>
        {state.error && (
          <div className={`mb-6 p-4 rounded-md ${isDark ? 'bg-red-800 text-red-100' : 'bg-red-100 text-red-800'}`}>
            {state.error}
          </div>
        )}
        {state.editingBanner ? (
          <form onSubmit={handleUpdate} className="space-y-6">
            <div>
              <label htmlFor="title" className={`block mb-2 ${isDark ? 'text-white' : 'text-gray-700'}`}>Title</label>
              <input
                type="text"
                id="title"
                value={state.editingBanner.title}
                onChange={(e) => dispatch({
                  type: 'UPDATE_EDITING_BANNER',
                  payload: { title: e.target.value }
                })}
                required
                minLength={3}
                className={`w-full px-3 py-2 border rounded-md ${
                  isDark ? 'bg-gray-800 text-white border-gray-700' : 'bg-white text-gray-900 border-gray-300'
                }`}
              />
            </div>
            <div>
              <label htmlFor="description" className={`block mb-2 ${isDark ? 'text-white' : 'text-gray-700'}`}>Description</label>
              <textarea
                id="description"
                value={state.editingBanner.description}
                onChange={(e) => dispatch({
                  type: 'UPDATE_EDITING_BANNER',
                  payload: { description: e.target.value }
                })}
                required
                minLength={10}
                rows={5}
                className={`w-full px-3 py-2 border rounded-md ${
                  isDark ? 'bg-gray-800 text-white border-gray-700' : 'bg-white text-gray-900 border-gray-300'
                }`}
              />
            </div>
            <div className="flex items-center space-x-4">
              <label className={`flex items-center ${isDark ? 'text-white' : 'text-gray-700'}`}>
                <input
                  type="radio"
                  checked={state.isLocalMedia}
                  onChange={() => dispatch({ type: 'SET_IS_LOCAL_MEDIA', payload: true })}
                  className="mr-2"
                />
                Local Media
              </label>
              <label className={`flex items-center ${isDark ? 'text-white' : 'text-gray-700'}`}>
                <input
                  type="radio"
                  checked={!state.isLocalMedia}
                  onChange={() => dispatch({ type: 'SET_IS_LOCAL_MEDIA', payload: false })}
                  className="mr-2"
                />
                YouTube Video
              </label>
            </div>
            {state.isLocalMedia ? (
              <>
                <div>
                  <label htmlFor="mediaFile" className={`block mb-2 ${isDark ? 'text-white' : 'text-gray-700'}`}>New Media File</label>
                  <input
                    type="file"
                    id="mediaFile"
                    onChange={handleMediaFileChange}
                    accept="image/*,video/*"
                    className={`w-full px-3 py-2 border rounded-md ${
                      isDark ? 'bg-gray-800 text-white border-gray-700' : 'bg-white text-gray-900 border-gray-300'
                    }`}
                  />
                </div>
                {state.editingBanner.mediaUrl && (
                  <div className="mt-4">
                    <label className={`block mb-2 ${isDark ? 'text-white' : 'text-gray-700'}`}>Current Media</label>
                    {state.editingBanner.mediaType === 'image' ? (
                      <div className="relative w-full h-48">
                        <Image
                          src={state.editingBanner.mediaUrl}
                          alt="Current Banner"
                          fill
                          className="object-cover rounded-md"
                        />
                      </div>
                    ) : (
                      <video src={state.editingBanner.mediaUrl} controls className="max-w-full h-auto rounded-md" />
                    )}
                  </div>
                )}
              </>
            ) : (
              <div>
                <label htmlFor="youtubeUrl" className={`block mb-2 ${isDark ? 'text-white' : 'text-gray-700'}`}>YouTube URL</label>
                <input
                  type="url"
                  id="youtubeUrl"
                  value={state.tempYoutubeUrl}
                  onChange={(e) => dispatch({ type: 'SET_TEMP_YOUTUBE_URL', payload: e.target.value })}
                  placeholder="https://www.youtube.com/watch?v=..."
                  className={`w-full px-3 py-2 border rounded-md ${
                    isDark ? 'bg-gray-800 text-white border-gray-700' : 'bg-white text-gray-900 border-gray-300'
                  }`}
                />
              </div>
            )}
            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={() => dispatch({ type: 'SET_EDITING_BANNER', payload: null })}
                className={`px-4 py-2 rounded-md ${
                  isDark ? 'bg-gray-600 hover:bg-gray-700' : 'bg-gray-200 hover:bg-gray-300'
                } text-gray-800 transition duration-300`}
              >
                Cancel
              </button>
              <button
                type="submit"
                className={`px-4 py-2 rounded-md ${
                  isDark ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'
                } text-white transition duration-300`}
              >
                Update Banner
              </button>
            </div>
          </form>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {state.banners.map((banner) => (
              <div key={banner.id} className={`p-6 rounded-lg shadow-md ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
                <div className="relative mb-4">
                  {banner.mediaType === 'image' ? (
                    <div className="relative w-full h-48">
                      <Image
                        src={banner.mediaUrl}
                        alt={banner.title}
                        fill
                        className="object-cover rounded-md"
                      />
                    </div>
                  ) : banner.mediaType === 'video' ? (
                    <video src={banner.mediaUrl} className="w-full h-48 object-cover rounded-md" controls />
                  ) : (
                    <iframe
                      src={`https://www.youtube.com/embed/${banner.youtubeId}`}
                      title={banner.title}
                      className="w-full h-48 rounded-md"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  )}
                  <div className="absolute top-2 right-2 bg-black bg-opacity-50 rounded-full p-2">
                    {banner.mediaType === 'image' ? (
                      <FaImage className="text-white" />
                    ) : banner.mediaType === 'video' ? (
                      <FaVideo className="text-white" />
                    ) : (
                      <FaYoutube className="text-white" />
                    )}
                  </div>
                </div>
                <h2 className={`text-2xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-800'}`}>{banner.title}</h2>
                <p className={`mb-4 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>{banner.description}</p>
                <div className="flex justify-center space-x-4">
                  <button
                    onClick={() => handleEdit(banner)}
                    className={`px-4 py-2 rounded-md ${
                      isDark ? 'bg-green-600 hover:bg-green-700' : 'bg-green-500 hover:bg-green-600'
                    } text-white transition duration-300 flex items-center`}
                  >
                    <FaEdit className="mr-2" /> Edit
                  </button>
                  <button
                    onClick={() => handleDelete(banner.id)}
                    className={`px-4 py-2 rounded-md ${
                      isDark ? 'bg-red-600 hover:bg-red-700' : 'bg-red-500 hover:bg-red-600'
                    } text-white transition duration-300 flex items-center`}
                  >
                    <FaTrash className="mr-2" /> Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
