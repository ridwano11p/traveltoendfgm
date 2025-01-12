import { db } from "@/lib/firebase/config";
import { collection, getDocs } from "firebase/firestore";
import PDFClient from "./PDFClient";
import { PDF } from "./types";

async function getPDFs() {
  try {
    const querySnapshot = await getDocs(collection(db, 'pdfs'));
    const pdfs = querySnapshot.docs.map(doc => {
      const data = doc.data();

      if (!data.title || !data.pdfUrl) {
        return null;
      }

      return {
        id: doc.id,
        title: data.title,
        description: (data.description || '').replace(/\n/g, '<br>'),
        pdfUrl: data.pdfUrl,
        createdAt: data.createdAt?.toDate?.()?.toISOString(),
        updatedAt: data.updatedAt?.toDate?.()?.toISOString()
      } as PDF;
    }).filter((pdf): pdf is PDF => pdf !== null);

    return pdfs;
  } catch (error) {
    console.error("Error fetching PDFs:", error);
    throw new Error("Failed to fetch PDFs");
  }
}

export default async function PDFsPage() {
  const pdfs = await getPDFs();
  return <PDFClient pdfs={pdfs} />;
}
