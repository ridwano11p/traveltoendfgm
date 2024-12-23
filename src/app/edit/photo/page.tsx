"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useTheme } from '@/context/ThemeContext';
import { useAuth } from '@/context/AuthContext';
import { db, storage } from '@/lib/firebase/config';
import { collection, query, getDocs, doc, updateDoc, deleteDoc, DocumentData } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL, deleteObject, listAll } from 'firebase/storage';
import { FaSpinner, FaEdit, FaTrash } from 'react-icons/fa';
import Image from 'next/image';

interface Photo {
  id: string;
  title: string;
  description: string;
  photoUrl: string;
  createdAt: Date;
  updatedAt: Date;
}

interface EditingPhoto extends Photo {
  tempPhotoUrl: string | null;
}

export default function EditPhoto() {
  const { theme } = useTheme();
  const { user } = useAuth();
  const router = useRouter();
  const isDark = theme === 'dark';

  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editingPhoto, setEditingPhoto] = useState<EditingPhoto | null>(null);
  const [newImage, setNewImage] = useState<File | null>(null);
  const [removedImage, setRemovedImage] = useState(false);

  useEffect(() => {
    if (!user) {
      router.push('/login');
    } else {
      fetchPhotos();
    }
  }, [user, router]);

  const fetchPhotos = async () => {
    setLoading(true);
    try {
      const q = query(collection(db, 'photos'));
      const querySnapshot = await getDocs(q);
      const fetchedPhotos = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Photo[];
      setPhotos(fetchedPhotos);
    } catch (err) {
      console.error("Error fetching photos: ", err);
      setError("Failed to fetch photos. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (photo: Photo) => {
    setEditingPhoto({...photo, tempPhotoUrl: photo.photoUrl});
    setNewImage(null);
    setRemovedImage(false);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setNewImage(file);
      setRemovedImage(false);
    }
  };

  const handleRemoveImage = () => {
    setRemovedImage(true);
    setNewImage(null);
    if (editingPhoto) {
      setEditingPhoto({...editingPhoto, tempPhotoUrl: null});
    }
  };

  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!editingPhoto) return;

    setLoading(true);
    setError(null);

    if (editingPhoto.title.trim().length < 3) {
      setError("Title must be at least 3 characters long.");
      setLoading(false);
      return;
    }

    try {
      const photoRef = doc(db, 'photos', editingPhoto.id);
      const updateData: DocumentData = {
        title: editingPhoto.title.trim(),
        description: editingPhoto.description.trim(),
        updatedAt: new Date()
      };

      // Handle image updates
      if (removedImage && !newImage) {
        updateData.photoUrl = null;
      } else if (newImage) {
        const imageRef = ref(storage, `photos/${Date.now()}_${newImage.name}`);
        await uploadBytes(imageRef, newImage);
        const photoUrl = await getDownloadURL(imageRef);
        updateData.photoUrl = photoUrl;
      }

      await updateDoc(photoRef, updateData);

      // Clean up old files if they were replaced or removed
      if ((removedImage || newImage) && editingPhoto.photoUrl) {
        await deleteObject(ref(storage, editingPhoto.photoUrl));
      }

      setEditingPhoto(null);
      fetchPhotos();
    } catch (err) {
      console.error("Error updating photo: ", err);
      setError("Failed to update photo. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (photoId: string) => {
    if (window.confirm("Are you sure you want to delete this photo?")) {
      setLoading(true);
      try {
        const photoToDelete = photos.find(photo => photo.id === photoId);
        if (photoToDelete?.photoUrl) {
          await deleteObject(ref(storage, photoToDelete.photoUrl));
        }

        await deleteDoc(doc(db, 'photos', photoId));

        const photosSnapshot = await getDocs(collection(db, 'photos'));
        if (photosSnapshot.empty) {
          const folderRef = ref(storage, 'photos');
          const listResult = await listAll(folderRef);
          await Promise.all(listResult.items.map(item => deleteObject(item)));
        }

        fetchPhotos();
      } catch (err) {
        console.error("Error deleting photo: ", err);
        setError("Failed to delete photo. Please try again.");
      } finally {
        setLoading(false);
      }
    }
  };

  if (loading) {
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
          Edit Photos
        </h1>
        {error && (
          <div className={`mb-4 p-4 rounded-md ${isDark ? 'bg-red-800 text-red-100' : 'bg-red-100 text-red-800'}`}>
            {error}
          </div>
        )}
        {photos.length === 0 ? (
          <div className={`text-center mt-8 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
            No photos created
          </div>
        ) : editingPhoto ? (
          <form onSubmit={handleUpdate} className="space-y-6">
            <div>
              <label htmlFor="title" className={`block mb-2 ${isDark ? 'text-white' : 'text-gray-700'}`}>Title</label>
              <input
                type="text"
                id="title"
                value={editingPhoto.title}
                onChange={(e) => setEditingPhoto({...editingPhoto, title: e.target.value})}
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
                value={editingPhoto.description}
                onChange={(e) => setEditingPhoto({...editingPhoto, description: e.target.value})}
                rows={4}
                className={`w-full px-3 py-2 border rounded-md ${
                  isDark ? 'bg-gray-800 text-white border-gray-700' : 'bg-white text-gray-900 border-gray-300'
                }`}
              />
            </div>
            <div>
              <label htmlFor="image" className={`block mb-2 ${isDark ? 'text-white' : 'text-gray-700'}`}>Image</label>
              {editingPhoto.tempPhotoUrl && !removedImage && (
                <div className="mb-2">
                  <div className="relative w-32 h-32">
                    <Image
                      src={editingPhoto.tempPhotoUrl}
                      alt={editingPhoto.title}
                      fill
                      className="object-cover rounded"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={handleRemoveImage}
                    className={`mt-2 px-2 py-1 rounded ${
                      isDark ? 'bg-red-600 hover:bg-red-700' : 'bg-red-500 hover:bg-red-600'
                    } text-white transition duration-300`}
                  >
                    Remove Image
                  </button>
                </div>
              )}
              <input
                type="file"
                id="image"
                onChange={handleImageChange}
                accept="image/*"
                className={`w-full px-3 py-2 border rounded-md ${
                  isDark ? 'bg-gray-800 text-white border-gray-700' : 'bg-white text-gray-900 border-gray-300'
                }`}
              />
            </div>
            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={() => setEditingPhoto(null)}
                className={`px-4 py-2 rounded-md ${
                  isDark ? 'bg-gray-600 hover:bg-gray-700' : 'bg-gray-200 hover:bg-gray-300'
                } text-gray-800 transition duration-300`}
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className={`px-4 py-2 rounded-md ${
                  isDark ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'
                } text-white transition duration-300 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {loading ? <FaSpinner className="animate-spin mx-auto" /> : 'Update Photo'}
              </button>
            </div>
          </form>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {photos.map((photo) => (
              <div key={photo.id} className={`p-6 rounded-lg shadow-md ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
                <div className="relative w-full h-48 mb-4">
                  <Image
                    src={photo.photoUrl}
                    alt={photo.title}
                    fill
                    className="object-cover rounded"
                  />
                </div>
                <h2 className={`text-xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-800'}`}>{photo.title}</h2>
                <p className={`mb-4 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>{photo.description}</p>
                <div className="flex justify-end space-x-4">
                  <button
                    onClick={() => handleEdit(photo)}
                    className={`px-4 py-2 rounded-md ${
                      isDark ? 'bg-green-600 hover:bg-green-700' : 'bg-green-500 hover:bg-green-600'
                    } text-white transition duration-300 flex items-center`}
                  >
                    <FaEdit className="mr-2" /> Edit
                  </button>
                  <button
                    onClick={() => handleDelete(photo.id)}
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