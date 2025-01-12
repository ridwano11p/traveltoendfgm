"use client";

import { useReducer, useEffect } from 'react';
import { useTheme } from '@/context/ThemeContext';
import { db, storage } from '@/lib/firebase/config';
import { collection, query, getDocs, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL, deleteObject, listAll } from 'firebase/storage';
import { FaSpinner } from 'react-icons/fa';
import { videoReducer, initialState } from './reducers/videoReducer';
import { validateYouTubeUrl, generateThumbnail, extractYoutubeId } from './utils/videoUtils';
import { FirestoreVideo, VideoUpdateData } from './types';
import VideoForm from './components/VideoForm';
import VideoCard from './components/VideoCard';

export default function EditVideoClient() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [state, dispatch] = useReducer(videoReducer, initialState);

  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos = async () => {
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      const q = query(collection(db, 'videos'));
      const querySnapshot = await getDocs(q);
      const fetchedVideos = querySnapshot.docs.map(doc => {
        const data = doc.data() as Omit<FirestoreVideo, 'id'>;
        return {
          ...data,
          id: doc.id,
          createdAt: data.createdAt ? new Date(data.createdAt.seconds * 1000) : new Date(),
          updatedAt: data.updatedAt ? new Date(data.updatedAt.seconds * 1000) : new Date(),
        };
      });
      dispatch({ type: 'SET_VIDEOS', payload: fetchedVideos });
    } catch (err) {
      console.error("Error fetching videos: ", err);
      dispatch({ type: 'SET_ERROR', payload: "Failed to fetch videos. Please try again." });
    }
  };

  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!state.editingVideo) return;

    dispatch({ type: 'SET_LOADING', payload: true });
    dispatch({ type: 'SET_ERROR', payload: null });

    if (state.editingVideo.title.trim().length < 3) {
      dispatch({ type: 'SET_ERROR', payload: "Title must be at least 3 characters long." });
      return;
    }

    if (state.editingVideo.description.trim().length < 10) {
      dispatch({ type: 'SET_ERROR', payload: "Description must be at least 10 characters long." });
      return;
    }

    if (!state.isLocalVideo && !validateYouTubeUrl(state.tempYoutubeUrl)) {
      dispatch({ type: 'SET_ERROR', payload: "Please provide a valid YouTube URL." });
      return;
    }

    try {
      const videoRef = doc(db, 'videos', state.editingVideo.id);
      let updateData: VideoUpdateData = {
        title: state.editingVideo.title.trim(),
        description: state.editingVideo.description.trim(),
        isYouTube: !state.isLocalVideo,
        updatedAt: new Date()
      };

      if (state.isLocalVideo) {
        if (state.newVideoFile) {
          if (state.editingVideo.videoUrl && !state.editingVideo.isYouTube) {
            const oldVideoRef = ref(storage, state.editingVideo.videoUrl);
            await deleteObject(oldVideoRef);
          }

          const videoFileRef = ref(storage, `videos/${state.newVideoFile.name}`);
          await uploadBytes(videoFileRef, state.newVideoFile);
          const videoUrl = await getDownloadURL(videoFileRef);
          updateData = { 
            ...updateData, 
            videoUrl,
            youtubeUrl: null,
            youtubeId: null
          };

          if (!state.newThumbnail) {
            const generatedThumbnail = await generateThumbnail(state.newVideoFile);
            const thumbnailRef = ref(storage, `video_thumbnails/generated_${state.newVideoFile.name}.jpg`);
            await uploadBytes(thumbnailRef, generatedThumbnail);
            const thumbnailUrl = await getDownloadURL(thumbnailRef);
            updateData = { ...updateData, thumbnailUrl };
          }
        }

        if (state.newThumbnail) {
          if (state.editingVideo.thumbnailUrl) {
            const oldThumbnailRef = ref(storage, state.editingVideo.thumbnailUrl);
            await deleteObject(oldThumbnailRef);
          }

          const thumbnailRef = ref(storage, `video_thumbnails/${state.newThumbnail.name}`);
          await uploadBytes(thumbnailRef, state.newThumbnail);
          const thumbnailUrl = await getDownloadURL(thumbnailRef);
          updateData = { 
            ...updateData, 
            thumbnailUrl,
            youtubeUrl: null,
            youtubeId: null
          };
        }

        updateData = {
          ...updateData,
          youtubeUrl: null,
          youtubeId: null
        };
      } else {
        if (state.editingVideo.videoUrl) {
          const oldVideoRef = ref(storage, state.editingVideo.videoUrl);
          await deleteObject(oldVideoRef);
        }
        if (state.editingVideo.thumbnailUrl) {
          const oldThumbnailRef = ref(storage, state.editingVideo.thumbnailUrl);
          await deleteObject(oldThumbnailRef);
        }

        updateData = {
          ...updateData,
          youtubeUrl: state.tempYoutubeUrl,
          youtubeId: extractYoutubeId(state.tempYoutubeUrl),
          videoUrl: null,
          thumbnailUrl: null
        };
      }

      // Convert dates to Firestore timestamps
      const firestoreData = {
        ...updateData,
        updatedAt: { seconds: Math.floor(updateData.updatedAt.getTime() / 1000), nanoseconds: 0 }
      };

      await updateDoc(videoRef, firestoreData);
      dispatch({ type: 'SET_EDITING_VIDEO', payload: null });
      fetchVideos();
    } catch (err) {
      console.error("Error updating video: ", err);
      dispatch({ type: 'SET_ERROR', payload: "Failed to update video. Please try again." });
    }
  };

  const handleDelete = async (videoId: string) => {
    if (!window.confirm("Are you sure you want to delete this video?")) return;

    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      const videoToDelete = state.videos.find(v => v.id === videoId);
      if (!videoToDelete) return;

      if (videoToDelete.videoUrl && !videoToDelete.isYouTube) {
        const videoRef = ref(storage, videoToDelete.videoUrl);
        await deleteObject(videoRef);
      }

      if (videoToDelete.thumbnailUrl) {
        const thumbnailRef = ref(storage, videoToDelete.thumbnailUrl);
        await deleteObject(thumbnailRef);
      }

      await deleteDoc(doc(db, 'videos', videoId));

      const videosSnapshot = await getDocs(collection(db, 'videos'));
      if (videosSnapshot.empty) {
        const videosRef = ref(storage, 'videos');
        const videosList = await listAll(videosRef);
        await Promise.all(videosList.items.map(item => deleteObject(item)));

        const thumbnailsRef = ref(storage, 'video_thumbnails');
        const thumbnailsList = await listAll(thumbnailsRef);
        await Promise.all(thumbnailsList.items.map(item => deleteObject(item)));
      }

      fetchVideos();
    } catch (err) {
      console.error("Error deleting video: ", err);
      dispatch({ type: 'SET_ERROR', payload: "Failed to delete video. Please try again." });
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
          Edit Videos
        </h1>

        {state.editingVideo ? (
          <VideoForm
            video={state.editingVideo}
            isLocalVideo={state.isLocalVideo}
            tempYoutubeUrl={state.tempYoutubeUrl}
            newVideoFile={state.newVideoFile}
            newThumbnail={state.newThumbnail}
            isDark={isDark}
            onUpdate={handleUpdate}
            onCancel={() => dispatch({ type: 'SET_EDITING_VIDEO', payload: null })}
            onRemoveVideo={() => dispatch({ type: 'REMOVE_VIDEO' })}
            dispatch={dispatch}
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {state.videos.map((video) => (
              <VideoCard
                key={video.id}
                video={video}
                isDark={isDark}
                onEdit={(video) => dispatch({ type: 'SET_EDITING_VIDEO', payload: video })}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}

        {state.error && (
          <div className={`mt-4 p-4 rounded-md ${
            isDark ? 'bg-red-800 text-red-100' : 'bg-red-100 text-red-800'
          }`}>
            {state.error}
          </div>
        )}
      </div>
    </div>
  );
}