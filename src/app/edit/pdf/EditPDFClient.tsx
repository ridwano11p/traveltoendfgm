"use client";

import { useState, useEffect } from 'react';

import { useTheme } from '@/context/ThemeContext';
import { db, storage } from '@/lib/firebase/config';
import { collection, query, getDocs, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL, deleteObject, listAll } from 'firebase/storage';
import { FaSpinner } from 'react-icons/fa';

import { PDF, EditingPDF, FormState } from './types';
import PDFCard from './components/PDFCard';
import EditForm from './components/EditForm';

interface FirestoreTimestamp {
  seconds: number;
  nanoseconds: number;
}

type PDFUpdateData = Partial<Omit<PDF, 'id' | 'createdAt' | 'updatedAt'>> & {
  updatedAt: FirestoreTimestamp;
};

export default function EditPDFClient() {
  const { theme } = useTheme();

  const isDark = theme === 'dark';

  const [pdfs, setPdfs] = useState<PDF[]>([]);
  const [editingPdf, setEditingPdf] = useState<EditingPDF | null>(null);
  const [newPdfFile, setNewPdfFile] = useState<File | null>(null);

  const [state, setState] = useState<FormState>({
    loading: true,
    updating: false,
    error: null,
  });

  useEffect(() => {
    fetchPdfs();
  }, []);

  const fetchPdfs = async () => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    try {
      const q = query(collection(db, 'pdfs'));
      const querySnapshot = await getDocs(q);
      const fetchedPdfs = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as PDF[];
      setPdfs(fetchedPdfs);
    } catch (err) {
      console.error("Error fetching PDFs: ", err);
      setState(prev => ({
        ...prev,
        error: "Failed to fetch PDFs. Please try again."
      }));
    } finally {
      setState(prev => ({ ...prev, loading: false }));
    }
  };

  const handleEdit = (pdf: PDF) => {
    setEditingPdf(pdf);
    setNewPdfFile(null);
  };

  const validateForm = (): boolean => {
    if (!editingPdf) return false;

    if (editingPdf.title.trim().length < 3) {
      setState(prev => ({
        ...prev,
        error: "Title must be at least 3 characters long."
      }));
      return false;
    }
    if (editingPdf.description.trim().length < 10) {
      setState(prev => ({
        ...prev,
        error: "Description must be at least 10 characters long."
      }));
      return false;
    }
    return true;
  };

  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!editingPdf) return;

    setState(prev => ({ ...prev, error: null, updating: true }));

    if (!validateForm()) {
      setState(prev => ({ ...prev, updating: false }));
      return;
    }

    try {
      const pdfRef = doc(db, 'pdfs', editingPdf.id);
      let updateData: PDFUpdateData = {
        title: editingPdf.title.trim(),
        description: editingPdf.description.trim(),
        updatedAt: {
          seconds: Math.floor(new Date().getTime() / 1000),
          nanoseconds: 0
        }
      };

      if (newPdfFile) {
        // Delete old PDF if it exists
        if (editingPdf.pdfUrl) {
          const oldPdfRef = ref(storage, editingPdf.pdfUrl);
          await deleteObject(oldPdfRef);
        }

        const fileName = `${Date.now()}_${newPdfFile.name}`;
        const pdfFileRef = ref(storage, `pdfs/${fileName}`);
        await uploadBytes(pdfFileRef, newPdfFile);
        const pdfUrl = await getDownloadURL(pdfFileRef);
        updateData = {
          ...updateData,
          pdfUrl,
          fileName: newPdfFile.name,
          storageFileName: fileName
        };
      }

      // Convert updatedAt to string format for the PDF interface
      const now = new Date();
      const updateDataWithTimestamp: PDFUpdateData = {
        ...updateData,
        updatedAt: {
          seconds: Math.floor(now.getTime() / 1000),
          nanoseconds: 0
        }
      };

      await updateDoc(pdfRef, updateDataWithTimestamp);
      setEditingPdf(null);
      fetchPdfs();
    } catch (err) {
      console.error("Error updating PDF: ", err);
      setState(prev => ({
        ...prev,
        error: "Failed to update PDF. Please try again."
      }));
    } finally {
      setState(prev => ({ ...prev, updating: false }));
    }
  };

  const handleDelete = async (pdfId: string) => {
    if (!window.confirm("Are you sure you want to delete this PDF?")) return;

    setState(prev => ({ ...prev, updating: true }));
    try {
      const pdfToDelete = pdfs.find(p => p.id === pdfId);
      if (!pdfToDelete) throw new Error("PDF not found");

      if (pdfToDelete.pdfUrl) {
        const pdfRef = ref(storage, pdfToDelete.pdfUrl);
        await deleteObject(pdfRef);
      }

      await deleteDoc(doc(db, 'pdfs', pdfId));

      // Check if this was the last item
      const pdfsSnapshot = await getDocs(collection(db, 'pdfs'));
      if (pdfsSnapshot.empty) {
        // Delete the entire 'pdfs' folder in Storage if empty
        const pdfsRef = ref(storage, 'pdfs');
        const pdfsList = await listAll(pdfsRef);
        await Promise.all(pdfsList.items.map(item => deleteObject(item)));
      }

      fetchPdfs();
    } catch (err) {
      console.error("Error deleting PDF: ", err);
      setState(prev => ({
        ...prev,
        error: "Failed to delete PDF. Please try again."
      }));
    } finally {
      setState(prev => ({ ...prev, updating: false }));
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
          Edit PDFs
        </h1>

        {state.error && (
          <div className={`mb-4 p-4 rounded-md ${
            isDark ? 'bg-red-800 text-red-100' : 'bg-red-100 text-red-800'
          }`}>
            {state.error}
          </div>
        )}

        {editingPdf ? (
          <EditForm
            pdf={editingPdf}
            onUpdate={handleUpdate}
            onCancel={() => setEditingPdf(null)}
            onFileChange={setNewPdfFile}
            updating={state.updating}
            isDark={isDark}
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pdfs.map((pdf) => (
              <PDFCard
                key={pdf.id}
                pdf={pdf}
                onEdit={handleEdit}
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