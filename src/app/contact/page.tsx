import { db } from "@/lib/firebase/config";
import { collection, query, orderBy, limit, getDocs } from "firebase/firestore";
import ContactClient from "./ContactClient";

interface ContactInfo {
  email: string;
  phone: string;
  location: string;
  createdAt?: string;
  updatedAt?: string;
}

async function getContactInfo() {
  try {
    const q = query(
      collection(db, 'siteContactInfo'),
      orderBy('createdAt', 'desc'),
      limit(1)
    );

    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      const doc = querySnapshot.docs[0];
      const data = doc.data();

      return {
        email: data.email,
        phone: data.phone,
        location: data.location,
        createdAt: data.createdAt?.toDate?.()?.toISOString(),
        updatedAt: data.updatedAt?.toDate?.()?.toISOString()
      } as ContactInfo;
    }

    return null;
  } catch (error) {
    console.error('Error fetching contact info:', error);
    throw new Error('Failed to fetch contact information');
  }
}

export default async function ContactPage() {
  const contactInfo = await getContactInfo();
  return <ContactClient contactInfo={contactInfo} />;
}
