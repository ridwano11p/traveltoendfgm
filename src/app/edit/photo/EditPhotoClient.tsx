"use client";

import { useState, useEffect } from 'react';
import { useTheme } from '@/context/ThemeContext';
import { db, storage } from '@/lib/firebase/config';
import { 
  collection, 
  query, 
  getDocs, 
  doc, 
  updateDoc, 
  deleteDoc, 
  Timestamp,
  FieldValue 
} from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { FaSpinner } from 'react-icons/fa';
import { Photo, PhotoState } from './types';
import PhotoList from './components/PhotoList';
import EditPhotoForm from './components/EditPhotoForm';

export default function EditPhotoClient() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const [state, setState] = useState<PhotoState>({
    photos: [],
    editingPhoto: null,
    newImage: null,
    removedImage: false,
    loading: true,
    error: null,
  });

  useEffect(() => {
    fetchPhotos();
  }, []);

  const fetchPhotos = async () => {
    setState(prev => ({ ...prev, loading: true }));
    try {
      const q = query(collection(db, 'photos'));
      const querySnapshot = await getDocs(q);
      const fetchedPhotos = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Photo[];
      setState(prev => ({
        ...prev,
        photos: fetchedPhotos,
        loading: false
      }));
    } catch (err) {
      console.error("Error fetching photos: ", err);
      setState(prev => ({
        ...prev,
        error: "Failed to fetch photos. Please try again.",
        loading: false
      }));
    }
  };

  const handleEdit = (photo: Photo) => {
    setState(prev => ({
      ...prev,
      editingPhoto: { ...photo, tempPhotoUrl: photo.photoUrl },
      newImage: null,
      removedImage: false
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setState(prev => ({
        ...prev,
        newImage: file,
        removedImage: false
      }));
    }
  };

  const handleRemoveImage = () => {
    setState(prev => ({
      ...prev,
      removedImage: true,
      newImage: null,
      editingPhoto: prev.editingPhoto ? {
        ...prev.editingPhoto,
        tempPhotoUrl: null
      } : null
    }));
  };

  interface UpdatePhotoData {
    title: string;
    description: string;
    updatedAt: Date;
    photoUrl?: string | null;
  }

  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!state.editingPhoto) return;

    setState(prev => ({ ...prev, loading: true, error: null }));

    if (state.editingPhoto.title.trim().length < 3) {
      setState(prev => ({
        ...prev,
        error: "Title must be at least 3 characters long.",
        loading: false
      }));
      return;
    }

    try {
      const photoRef = doc(db, 'photos', state.editingPhoto.id);
      const updateData: UpdatePhotoData = {
        title: state.editingPhoto.title.trim(),
        description: state.editingPhoto.description.trim(),
        updatedAt: new Date(),
        photoUrl: undefined
      };

      if (state.removedImage && !state.newImage) {
        updateData.photoUrl = null;
      } else if (state.newImage) {
        const imageRef = ref(storage, `photos/${Date.now()}_${state.newImage.name}`);
        await uploadBytes(imageRef, state.newImage);
        updateData.photoUrl = await getDownloadURL(imageRef);
      }

      // Convert data to Firestore format
      const firestoreData: { [key: string]: string | null | Timestamp | FieldValue } = {
        title: updateData.title,
        description: updateData.description,
        updatedAt: Timestamp.fromDate(updateData.updatedAt)
      };

      if (updateData.photoUrl !== undefined) {
        firestoreData.photoUrl = updateData.photoUrl;
      }

      await updateDoc(photoRef, firestoreData);

      if ((state.removedImage || state.newImage) && state.editingPhoto.photoUrl) {
        try {
          await deleteObject(ref(storage, state.editingPhoto.photoUrl));
        } catch (error) {
          console.error("Error deleting old image:", error);
        }
      }

      setState(prev => ({
        ...prev,
        editingPhoto: null,
        loading: false
      }));
      fetchPhotos();
    } catch (err) {
      console.error("Error updating photo: ", err);
      setState(prev => ({
        ...prev,
        error: "Failed to update photo. Please try again.",
        loading: false
      }));
    }
  };

  const handleDelete = async (photoId: string) => {
    if (!window.confirm("Are you sure you want to delete this photo?")) return;

    setState(prev => ({ ...prev, loading: true }));
    try {
      const photoToDelete = state.photos.find(photo => photo.id === photoId);
      if (photoToDelete?.photoUrl) {
        try {
          await deleteObject(ref(storage, photoToDelete.photoUrl));
        } catch (error) {
          console.error("Error deleting photo file:", error);
        }
      }

      await deleteDoc(doc(db, 'photos', photoId));

      const photosSnapshot = await getDocs(collection(db, 'photos'));
      if (photosSnapshot.empty) {
        const folderRef = ref(storage, 'photos');
        const { listAll } = await import('firebase/storage');
        const listResult = await listAll(folderRef);
        await Promise.all(listResult.items.map(item => deleteObject(item)));
      }

      fetchPhotos();
    } catch (err) {
      console.error("Error deleting photo: ", err);
      setState(prev => ({
        ...prev,
        error: "Failed to delete photo. Please try again.",
        loading: false
      }));
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
          Edit Photos
        </h1>

        {state.error && (
          <div className={`mb-6 p-4 rounded-md ${
            isDark ? 'bg-red-800 text-red-100' : 'bg-red-100 text-red-800'
          }`}>
            {state.error}
          </div>
        )}

        {state.editingPhoto ? (
          <EditPhotoForm
            photo={state.editingPhoto}
            onUpdate={handleUpdate}
            onCancel={() => setState(prev => ({ ...prev, editingPhoto: null }))}
            onImageChange={handleImageChange}
            onRemoveImage={handleRemoveImage}
            removedImage={state.removedImage}
            isDark={isDark}
          />
        ) : (
          <PhotoList
            photos={state.photos}
            onEdit={handleEdit}
            onDelete={handleDelete}
            isDark={isDark}
          />
        )}
      </div>
    </div>
  );
}
