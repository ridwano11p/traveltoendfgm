"use client";

import { useReducer, useEffect } from 'react';
import { useTheme } from '@/context/ThemeContext';
import { db, storage } from '@/lib/firebase/config';
import { Blog } from './types';
import {
  collection,
  query,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
} from 'firebase/firestore';
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from 'firebase/storage';
import { FaSpinner } from 'react-icons/fa';
import { blogReducer, initialState } from './reducers';
import BlogCard from './components/BlogCard';
import BlogForm from './components/BlogForm';

function validateYouTubeUrl(url: string): boolean {
  const regExp = /^(?:https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/(watch\?v=)?([a-zA-Z0-9_-]{11})$/;
  return regExp.test(url);
}

function extractYoutubeId(url: string): string | null {
  const match = url.match(/(?:https?:\/\/)?(?:www\.)?(?:youtube\.com|youtu\.be)\/(?:watch\?v=)?([a-zA-Z0-9_-]{11})/);
  return match ? match[1] : null;
}

export default function EditBlogClient() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [state, dispatch] = useReducer(blogReducer, initialState);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      const q = query(collection(db, 'blogs'));
      const querySnapshot = await getDocs(q);
      const fetchedBlogs = querySnapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          title: data.title || '',
          content: data.content || '',
          author: data.author || '',
          imageUrl: data.imageUrl,
          videoUrl: data.videoUrl,
          isYouTubeVideo: data.isYouTubeVideo || false,
          tags: data.tags || [],
          createdAt: data.createdAt?.toDate() || new Date(),
          updatedAt: data.updatedAt?.toDate() || new Date(),
        } as Blog;
      });
      dispatch({ type: 'SET_BLOGS', payload: fetchedBlogs });
    } catch (err) {
      console.error("Error fetching blogs: ", err);
      dispatch({
        type: 'SET_ERROR',
        payload: "Failed to fetch blogs. Please try again."
      });
    }
  };

  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!state.editingBlog) return;

    dispatch({ type: 'SET_LOADING', payload: true });
    dispatch({ type: 'SET_ERROR', payload: null });

    try {
      const blogRef = doc(db, 'blogs', state.editingBlog.id);
      const updateData: Record<string, any> = {
        title: state.editingBlog.title.trim(),
        content: state.editingBlog.content.trim(),
        author: state.editingBlog.author.trim(),
        tags: state.tags,
        updatedAt: new Date()
      };

      // Handle image update
      if (state.removedImage) {
        if (state.editingBlog.imageUrl) {
          const imageRef = ref(storage, state.editingBlog.imageUrl);
          await deleteObject(imageRef).catch(console.error);
        }
        updateData.imageUrl = null;
      } else if (state.newImage) {
        if (state.editingBlog.imageUrl) {
          const oldImageRef = ref(storage, state.editingBlog.imageUrl);
          await deleteObject(oldImageRef).catch(console.error);
        }
        const imageRef = ref(storage, `blogstorage/${state.newImage.name}`);
        await uploadBytes(imageRef, state.newImage);
        updateData.imageUrl = await getDownloadURL(imageRef);
      }

      // Handle video update
      if (state.removedVideo) {
        if (state.editingBlog.videoUrl && !state.editingBlog.isYouTubeVideo) {
          const videoRef = ref(storage, state.editingBlog.videoUrl);
          await deleteObject(videoRef).catch(console.error);
        }
        updateData.videoUrl = null;
        updateData.isYouTubeVideo = false;
      } else if (state.isYouTubeVideo) {
        if (state.editingBlog.videoUrl && !state.editingBlog.isYouTubeVideo) {
          const videoRef = ref(storage, state.editingBlog.videoUrl);
          await deleteObject(videoRef).catch(console.error);
        }
        if (!validateYouTubeUrl(state.youTubeUrl)) {
          dispatch({
            type: 'SET_ERROR',
            payload: "Please provide a valid YouTube URL."
          });
          return;
        }
        updateData.videoUrl = state.youTubeUrl;
        updateData.isYouTubeVideo = true;
      } else if (state.newVideo) {
        if (state.editingBlog.videoUrl && !state.editingBlog.isYouTubeVideo) {
          const oldVideoRef = ref(storage, state.editingBlog.videoUrl);
          await deleteObject(oldVideoRef).catch(console.error);
        }
        const videoRef = ref(storage, `blogstorage/${state.newVideo.name}`);
        await uploadBytes(videoRef, state.newVideo);
        updateData.videoUrl = await getDownloadURL(videoRef);
        updateData.isYouTubeVideo = false;
      }

      await updateDoc(blogRef, updateData);
      dispatch({ type: 'SET_EDITING_BLOG', payload: null });
      fetchBlogs();
    } catch (err) {
      console.error("Error updating blog: ", err);
      dispatch({
        type: 'SET_ERROR',
        payload: "Failed to update blog. Please try again."
      });
    }
  };

  const handleDelete = async (blogId: string) => {
    if (window.confirm("Are you sure you want to delete this blog?")) {
      dispatch({ type: 'SET_LOADING', payload: true });
      try {
        const blogToDelete = state.blogs.find(b => b.id === blogId);
        
        if (blogToDelete) {
          // Delete associated media files
          if (blogToDelete.imageUrl) {
            const imageRef = ref(storage, blogToDelete.imageUrl);
            await deleteObject(imageRef).catch(console.error);
          }
          if (blogToDelete.videoUrl && !blogToDelete.isYouTubeVideo) {
            const videoRef = ref(storage, blogToDelete.videoUrl);
            await deleteObject(videoRef).catch(console.error);
          }
        }

        await deleteDoc(doc(db, 'blogs', blogId));
        dispatch({ type: 'SET_BLOGS', payload: state.blogs.filter(b => b.id !== blogId) });
      } catch (err) {
        console.error("Error deleting blog: ", err);
        dispatch({
          type: 'SET_ERROR',
          payload: "Failed to delete blog. Please try again."
        });
      } finally {
        dispatch({ type: 'SET_LOADING', payload: false });
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
          Edit Blogs
        </h1>

        {state.error && (
          <div className={`mb-6 p-4 rounded-md ${
            isDark ? 'bg-red-800 text-red-100' : 'bg-red-100 text-red-800'
          }`}>
            {state.error}
          </div>
        )}

        {state.editingBlog ? (
          <BlogForm
            blog={state.editingBlog}
            state={state}
            dispatch={dispatch}
            onCancel={() => dispatch({ type: 'SET_EDITING_BLOG', payload: null })}
            onSubmit={handleUpdate}
            isDark={isDark}
          />
        ) : (
          <div className="space-y-6">
            {state.blogs.map((blog) => (
              <BlogCard
                key={blog.id}
                blog={blog}
                onEdit={(blog) => dispatch({ type: 'SET_EDITING_BLOG', payload: blog })}
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