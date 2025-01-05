"use client";

import { useTheme } from '@/context/ThemeContext';
import ContactItem from './components/ContactItem';
import { FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';

interface ContactInfo {
  email: string;
  phone: string;
  location: string;
}

interface Props {
  contactInfo: ContactInfo | null;
}

export default function ContactClient({ contactInfo }: Props) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <div className={`min-h-screen py-12 ${isDark ? 'bg-gray-900' : 'bg-[#90d2dc]'}`}>
      <div className="max-w-2xl mx-auto px-4">
        <h1 className={`text-4xl font-bold mb-8 text-center ${isDark ? 'text-white' : 'text-gray-800'}`}>
          Contact Us
        </h1>

        {contactInfo ? (
          <div className={`p-6 rounded-lg ${isDark ? 'bg-gray-800' : 'bg-[#90d2dc]'} shadow-lg`}>
            <ContactItem
              icon={<FaEnvelope size={24} />}
              label="Email"
              value={contactInfo.email}
              isDark={isDark}
            />
            <ContactItem
              icon={<FaPhone size={24} />}
              label="Phone"
              value={contactInfo.phone}
              isDark={isDark}
            />
            <ContactItem
              icon={<FaMapMarkerAlt size={24} />}
              label="Location"
              value={contactInfo.location}
              isDark={isDark}
            />
          </div>
        ) : (
          <p className={`text-center ${isDark ? 'text-white' : 'text-gray-800'}`}>
            No contact information available.
          </p>
        )}
      </div>
    </div>
  );
}
