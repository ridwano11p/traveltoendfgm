"use client";

import { useReducer, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useTheme } from '@/context/ThemeContext';
import { db, storage } from '@/lib/firebase/config';
import { collection, query, getDocs, doc, updateDoc, deleteDoc, writeBatch } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { FaSpinner } from 'react-icons/fa';
import { 
  FeatureStoryState, 
  FeatureStoryAction, 
  FeatureStory,
  UpdateFeatureStoryData 
} from './types';
import FeatureStoryList from './components/FeatureStoryList';
import FeatureStoryForm from './components/FeatureStoryForm';
import { validateYouTubeUrl } from './utils/youtubeHelpers';

const initialState: FeatureStoryState = {
  stories: [],
  loading: true,
  error: null,
  editingStory: null,
  newImage: null,
  newVideo: null,
  isYouTubeVideo: false,
  youTubeUrl: '',
  tags: [],
  newTag: '',
  removedImage: false,
  removedVideo: false,
};

function reducer(state: FeatureStoryState, action: FeatureStoryAction): FeatureStoryState {
  switch (action.type) {
    case 'SET_STORIES':
      return { ...state, stories: action.payload, loading: false };
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload, loading: false };
    case 'SET_EDITING_STORY':
      return {
        ...state,
        editingStory: action.payload,
        newImage: null,
        newVideo: null,
        isYouTubeVideo: action.payload ? action.payload.isYouTubeVideo || false : false,
        youTubeUrl: action.payload ? action.payload.videoUrl || '' : '',
        tags: action.payload ? action.payload.tags || [] : [],
        removedImage: false,
        removedVideo: false,
      };
    case 'UPDATE_EDITING_STORY':
      return {
        ...state,
        editingStory: state.editingStory
          ? { ...state.editingStory, ...action.payload }
          : null,
      };
    case 'SET_NEW_IMAGE':
      return { ...state, newImage: action.payload };
    case 'SET_NEW_VIDEO':
      return { ...state, newVideo: action.payload };
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
      return { ...state, removedImage: action.payload };
    case 'SET_REMOVED_VIDEO':
      return { ...state, removedVideo: action.payload };
    default:
      return state;
  }
}

export default function EditFeatureStoryClient() {
  const { theme } = useTheme();
  const router = useRouter();
  const isDark = theme === 'dark';
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    fetchStories();
  }, []);

  const fetchStories = async () => {
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      const q = query(collection(db, 'featureStories'));
      const querySnapshot = await getDocs(q);
      const storiesData = querySnapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          title: data.title || '',
          content: data.content || '',
          imageUrl: data.imageUrl,
          videoUrl: data.videoUrl,
          isYouTubeVideo: data.isYouTubeVideo || false,
          tags: data.tags || [],
          createdAt: data.createdAt?.toDate() || new Date(),
          updatedAt: data.updatedAt?.toDate() || new Date()
        } satisfies FeatureStory;
      });
      dispatch({ type: 'SET_STORIES', payload: storiesData });
    } catch (err) {
      console.error("Error fetching stories: ", err);
      dispatch({
        type: 'SET_ERROR',
        payload: "Failed to fetch stories. Please try again."
      });
    }
  };

  const handleDelete = async (story: FeatureStory) => {
    if (window.confirm("Are you sure you want to delete this feature story?")) {
      dispatch({ type: 'SET_LOADING', payload: true });
      try {
        if (story.imageUrl) {
          const imageRef = ref(storage, story.imageUrl);
          await deleteObject(imageRef);
        }
        if (story.videoUrl && !story.isYouTubeVideo) {
          const videoRef = ref(storage, story.videoUrl);
          await deleteObject(videoRef);
        }

        await deleteDoc(doc(db, 'featureStories', story.id));

        const batch = writeBatch(db);
        const tagsQuery = query(collection(db, 'tags'));
        const tagsSnapshot = await getDocs(tagsQuery);

        tagsSnapshot.forEach((tagDoc) => {
          const tagData = tagDoc.data();
          if (tagData.storyIds && tagData.storyIds.includes(story.id)) {
            const updatedStoryIds = tagData.storyIds.filter(
              (id: string) => id !== story.id
            );
            if (updatedStoryIds.length === 0) {
              batch.delete(tagDoc.ref);
            } else {
              batch.update(tagDoc.ref, { storyIds: updatedStoryIds });
            }
          }
        });

        await batch.commit();
        fetchStories();
      } catch (err) {
        console.error("Error deleting story: ", err);
        dispatch({
          type: 'SET_ERROR',
          payload: "Failed to delete story. Please try again."
        });
      }
    }
  };

  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!state.editingStory) return;

    dispatch({ type: 'SET_LOADING', payload: true });
    dispatch({ type: 'SET_ERROR', payload: null });

    if (state.editingStory.title.trim().length < 3) {
      dispatch({
        type: 'SET_ERROR',
        payload: "Title must be at least 3 characters long."
      });
      return;
    }

    if (state.editingStory.content.trim().length < 50) {
      dispatch({
        type: 'SET_ERROR',
        payload: "Content must be at least 50 characters long."
      });
      return;
    }

    if (state.isYouTubeVideo && !validateYouTubeUrl(state.youTubeUrl)) {
      dispatch({
        type: 'SET_ERROR',
        payload: "Please enter a valid YouTube URL."
      });
      return;
    }

    try {
      const storyRef = doc(db, 'featureStories', state.editingStory.id);
      let updateData: UpdateFeatureStoryData = {
        title: state.editingStory.title.trim(),
        content: state.editingStory.content.trim(),
        tags: state.tags,
        updatedAt: new Date()
      };

      // Handle image updates
      if (state.removedImage) {
        if (state.editingStory.imageUrl) {
          const imageRef = ref(storage, state.editingStory.imageUrl);
          await deleteObject(imageRef);
        }
        updateData.imageUrl = null;
      } else if (state.newImage) {
        if (state.editingStory.imageUrl) {
          const oldImageRef = ref(storage, state.editingStory.imageUrl);
          await deleteObject(oldImageRef);
        }
        const imageRef = ref(storage, `featureStories/${state.editingStory.id}/image`);
        await uploadBytes(imageRef, state.newImage);
        updateData.imageUrl = await getDownloadURL(imageRef);
      }

      // Handle video updates
      if (state.removedVideo) {
        if (state.editingStory.videoUrl && !state.editingStory.isYouTubeVideo) {
          const videoRef = ref(storage, state.editingStory.videoUrl);
          await deleteObject(videoRef);
        }
        updateData.videoUrl = null;
        updateData.isYouTubeVideo = false;
      } else if (state.isYouTubeVideo) {
        if (state.editingStory.videoUrl && !state.editingStory.isYouTubeVideo) {
          const videoRef = ref(storage, state.editingStory.videoUrl);
          await deleteObject(videoRef);
        }
        updateData.videoUrl = state.youTubeUrl;
        updateData.isYouTubeVideo = true;
      } else if (state.newVideo) {
        if (state.editingStory.videoUrl && !state.editingStory.isYouTubeVideo) {
          const oldVideoRef = ref(storage, state.editingStory.videoUrl);
          await deleteObject(oldVideoRef);
        }
        const videoRef = ref(storage, `featureStories/${state.editingStory.id}/video`);
        await uploadBytes(videoRef, state.newVideo);
        updateData.videoUrl = await getDownloadURL(videoRef);
        updateData.isYouTubeVideo = false;
      }

      // Convert to plain object for Firestore
      const firestoreData = {
        ...updateData,
        updatedAt: updateData.updatedAt
      } as const;

      await updateDoc(storyRef, firestoreData);
      dispatch({ type: 'SET_EDITING_STORY', payload: null });
      fetchStories();
    } catch (err) {
      console.error("Error updating story: ", err);
      dispatch({
        type: 'SET_ERROR',
        payload: "Failed to update story. Please try again."
      });
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
          Edit Feature Stories
        </h1>

        {state.editingStory ? (
          <FeatureStoryForm
            state={state}
            dispatch={dispatch}
            onUpdate={handleUpdate}
            onCancel={() => dispatch({ type: 'SET_EDITING_STORY', payload: null })}
            isDark={isDark}
          />
        ) : (
          <FeatureStoryList
            stories={state.stories}
            onEdit={(story) => dispatch({ type: 'SET_EDITING_STORY', payload: story })}
            onDelete={handleDelete}
            isDark={isDark}
          />
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