"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { collection, query, orderBy, limit, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase/config';
import { useAuth } from '@/context/AuthContext';
import { useTheme } from '@/context/ThemeContext';
import {
  FaEnvelope, FaPhone, FaMapMarkerAlt, FaHome,
  FaUsers, FaHandsHelping, FaBook, FaAddressBook
} from 'react-icons/fa';

interface ContactInfo {
  email: string;
  phone: string;
  location: string;
}

export default function Footer() {
  const [contactInfo, setContactInfo] = useState<ContactInfo | null>(null);
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  useEffect(() => {
    const fetchContactInfo = async () => {
      try {
        const q = query(
          collection(db, 'siteContactInfo'),
          orderBy('createdAt', 'desc'),
          limit(1)
        );
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
          const data = querySnapshot.docs[0].data() as ContactInfo;
          setContactInfo(data);
        }
      } catch (error) {
        console.error('Error fetching contact info:', error);
      }
    };

    fetchContactInfo();
  }, []);

  return (
    <footer className={`${isDark ? 'bg-gray-900 text-gray-300' : 'bg-teal-700 text-white'} py-12`}>
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-between">
          <div className="w-full md:w-1/2 mb-8 md:mb-0">
            <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
            {contactInfo && (
              <div className="space-y-4">
                <div className="flex items-center">
                  <FaEnvelope className="mr-3 text-xl" />
                  <a href={`mailto:${contactInfo.email}`} className="hover:underline">
                    {contactInfo.email}
                  </a>
                </div>
                <div className="flex items-center">
                  <FaPhone className="mr-3 text-xl" />
                  <a href={`tel:${contactInfo.phone}`} className="hover:underline">
                    {contactInfo.phone}
                  </a>
                </div>
                <div className="flex items-center">
                  <FaMapMarkerAlt className="mr-3 text-xl" />
                  <span>{contactInfo.location}</span>
                </div>
              </div>
            )}
          </div>
          <div className="w-full md:w-1/2">
            <h2 className="text-2xl font-bold mb-4">Helpful Links</h2>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="flex items-center hover:underline">
                  <FaHome className="mr-3 text-xl" />
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about/who-we-are" className="flex items-center hover:underline">
                  <FaUsers className="mr-3 text-xl" />
                  Who We Are
                </Link>
              </li>
              <li>
                <Link href="/about/what-we-do" className="flex items-center hover:underline">
                  <FaHandsHelping className="mr-3 text-xl" />
                  What We Do
                </Link>
              </li>
              <li>
                <Link href="/impact-stories" className="flex items-center hover:underline">
                  <FaBook className="mr-3 text-xl" />
                  Impact Stories
                </Link>
              </li>
              <li>
                <Link href="/contact" className="flex items-center hover:underline">
                  <FaAddressBook className="mr-3 text-xl" />
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
