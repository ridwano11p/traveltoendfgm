"use client";

import { useReducer, useEffect } from 'react';
import { useTheme } from '@/context/ThemeContext';
import { db, storage } from '@/lib/firebase/config';
import { collection, query, getDocs, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { Banner } from './types';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { FaSpinner } from 'react-icons/fa';
import { bannerReducer, initialState } from './reducers';
import BannerCard from './components/BannerCard';
import BannerForm from './components/BannerForm';

function validateYouTubeUrl(url: string): boolean {
  const regExp = /^(?:https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/(watch\?v=)?([a-zA-Z0-9_-]{11})$/;
  return regExp.test(url);
}

function extractYoutubeId(url: string): string | null {
  const match = url.match(/(?:https?:\/\/)?(?:www\.)?(?:youtube\.com|youtu\.be)\/(?:watch\?v=)?([a-zA-Z0-9_-]{11})/);
  return match ? match[1] : null;
}

export default function EditBannerClient() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [state, dispatch] = useReducer(bannerReducer, initialState);

  useEffect(() => {
    fetchBanners();
  }, []);

  const fetchBanners = async () => {
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      const q = query(collection(db, 'banners'));
      const querySnapshot = await getDocs(q);
      const fetchedBanners = querySnapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          title: data.title || '',
          description: data.description || '',
          mediaUrl: data.mediaUrl || '',
          mediaType: (data.mediaType as 'image' | 'video' | 'youtube') || 'image',
          isYouTube: data.isYouTube || false,
          youtubeId: data.youtubeId || null,
          updatedAt: data.updatedAt?.toDate() || new Date()
        } as Banner;
      });
      dispatch({ type: 'SET_BANNERS', payload: fetchedBanners });
    } catch (err) {
      console.error("Error fetching banners: ", err);
      dispatch({
        type: 'SET_ERROR',
        payload: "Failed to fetch banners. Please try again."
      });
    }
  };

  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!state.editingBanner) return;

    dispatch({ type: 'SET_LOADING', payload: true });
    dispatch({ type: 'SET_ERROR', payload: null });

    if (state.editingBanner.title.trim().length < 3) {
      dispatch({
        type: 'SET_ERROR',
        payload: "Title must be at least 3 characters long."
      });
      return;
    }

    if (state.editingBanner.description.trim().length < 10) {
      dispatch({
        type: 'SET_ERROR',
        payload: "Description must be at least 10 characters long."
      });
      return;
    }

    if (!state.isLocalMedia && !validateYouTubeUrl(state.tempYoutubeUrl)) {
      dispatch({
        type: 'SET_ERROR',
        payload: "Please provide a valid YouTube URL."
      });
      return;
    }

    try {
      const bannerRef = doc(db, 'banners', state.editingBanner.id);
      type BannerUpdateData = Partial<Omit<Banner, 'id'>>;
      
      const updateData: BannerUpdateData = {
        title: state.editingBanner.title.trim(),
        description: state.editingBanner.description.trim(),
        updatedAt: new Date()
      };

      if (state.isLocalMedia) {
        if (state.newMediaFile) {
          // Delete old media if it exists
          if (state.editingBanner.mediaUrl && state.editingBanner.mediaType !== 'youtube') {
            const oldMediaRef = ref(storage, state.editingBanner.mediaUrl);
            await deleteObject(oldMediaRef).catch(console.error);
          }

          const mediaRef = ref(storage, `bannerstorage/${state.newMediaFile.name}`);
          await uploadBytes(mediaRef, state.newMediaFile);
          const mediaUrl = await getDownloadURL(mediaRef);
          updateData.mediaUrl = mediaUrl;
          updateData.mediaType = state.newMediaFile.type.startsWith('image/') ? 'image' : 'video';
        }

        updateData.isYouTube = false;
        updateData.youtubeId = null;
      } else {
        // If changing from local to YouTube, delete local media
        if (state.editingBanner.mediaUrl && state.editingBanner.mediaType !== 'youtube') {
          const oldMediaRef = ref(storage, state.editingBanner.mediaUrl);
          await deleteObject(oldMediaRef).catch(console.error);
        }

        updateData.mediaUrl = state.tempYoutubeUrl;
        updateData.mediaType = 'youtube';
        updateData.isYouTube = true;
        updateData.youtubeId = extractYoutubeId(state.tempYoutubeUrl);
      }

      await updateDoc(bannerRef, updateData);
      dispatch({ type: 'SET_EDITING_BANNER', payload: null });
      fetchBanners();
    } catch (err) {
      console.error("Error updating banner: ", err);
      dispatch({
        type: 'SET_ERROR',
        payload: "Failed to update banner. Please try again."
      });
    }
  };

  const handleDelete = async (bannerId: string) => {
    if (window.confirm("Are you sure you want to delete this banner?")) {
      dispatch({ type: 'SET_LOADING', payload: true });
      try {
        const bannerToDelete = state.banners.find(b => b.id === bannerId);

        if (bannerToDelete?.mediaUrl && bannerToDelete.mediaType !== 'youtube') {
          const mediaRef = ref(storage, bannerToDelete.mediaUrl);
          await deleteObject(mediaRef).catch(console.error);
        }

        await deleteDoc(doc(db, 'banners', bannerId));
        dispatch({ type: 'REMOVE_BANNER', payload: bannerId });
        dispatch({ type: 'SET_LOADING', payload: false });
      } catch (err) {
        console.error("Error deleting banner: ", err);
        dispatch({
          type: 'SET_ERROR',
          payload: "Failed to delete banner. Please try again."
        });
      }
    }
  };

  if (state.loading) {
    return (
      <div className={`flex justify-center items-center h-screen ${
        isDark ? 'bg-gray-900' : 'bg-[#90d2dc]'
      }`}>
        <FaSpinner className={`animate-spin text-6xl ${
          isDark ? 'text-white' : 'text-gray-800'
        }`} />
      </div>
    );
  }

  return (
    <div className={`min-h-screen py-12 ${isDark ? 'bg-gray-900' : 'bg-[#90d2dc]'}`}>
      <div className="max-w-6xl mx-auto px-4">
        <h1 className={`text-4xl font-bold mb-8 text-center ${
          isDark ? 'text-white' : 'text-gray-800'
        }`}>
          Edit Banners
        </h1>

        {state.error && (
          <div className={`mb-6 p-4 rounded-md ${
            isDark ? 'bg-red-800 text-red-100' : 'bg-red-100 text-red-800'
          }`}>
            {state.error}
          </div>
        )}

        {state.editingBanner ? (
          <BannerForm
            state={state}
            dispatch={dispatch}
            onCancel={() => dispatch({ type: 'SET_EDITING_BANNER', payload: null })}
            onSubmit={handleUpdate}
            isDark={isDark}
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {state.banners.map((banner) => (
              <BannerCard
                key={banner.id}
                banner={banner}
                onEdit={(banner) => dispatch({
                  type: 'SET_EDITING_BANNER',
                  payload: banner
                })}
                onDelete={handleDelete}
                isDark={isDark}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}