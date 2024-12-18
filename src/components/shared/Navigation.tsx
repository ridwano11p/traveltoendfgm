"use client";

import Link from 'next/link';
import Image from 'next/image';
import logo from '../../assets/images/sitelogo.png';
import { useState, useRef, useEffect, RefObject } from 'react';

export default function Navigation() {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const dropdownRefs: { [key: string]: RefObject<HTMLDivElement | null> } = {
    'About Us': useRef<HTMLDivElement>(null),
    'Documentary': useRef<HTMLDivElement>(null),
    'Research and Reports': useRef<HTMLDivElement>(null),
    'Gallery': useRef<HTMLDivElement>(null),
  };

  const handleDropdownClick = (dropdownName: string) => {
    setOpenDropdown(openDropdown === dropdownName ? null : dropdownName);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (openDropdown) {
        const dropdownRef = dropdownRefs[openDropdown];
        if (dropdownRef && dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
          setOpenDropdown(null);
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [openDropdown]);


  return (
    <nav className="bg-teal-700 p-4 text-white">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <Link href="/" className="flex items-center">
            <Image src={logo} alt="Travel To End FGM Logo" width={50} height={50} className="mr-2" />
            <span className="font-bold text-xl">Travel To End FGM</span>
          </Link>
        </div>
        <div className="flex items-center space-x-6">
          <Link href="/" className="hover:text-gray-200">Home</Link>
          <Link href="/search-page" className="hover:text-gray-200">Search</Link>
          <div className="relative group" ref={dropdownRefs['About Us']}>
            <button
              className="hover:text-gray-200 flex items-center"
              onClick={() => handleDropdownClick('About Us')}
            >
              About Us <span className="ml-1">&#9660;</span>
            </button>
            <div className={`absolute ${openDropdown === 'About Us' ? 'block' : 'hidden'} bg-white text-gray-800 p-2 mt-1 rounded shadow-md`}>
              <Link href="/about/who-we-are" className="block px-4 py-2 hover:bg-gray-100">Who We Are</Link>
              <Link href="/about/what-we-do" className="block px-4 py-2 hover:bg-gray-100">What We Do</Link>
            </div>
          </div>
          <Link href="/impact-stories" className="hover:text-gray-200">Stories</Link>
          <div className="relative group" ref={dropdownRefs['Documentary']}>
            <button
              className="hover:text-gray-200 flex items-center"
              onClick={() => handleDropdownClick('Documentary')}
            >
              Documentary <span className="ml-1">&#9660;</span>
            </button>
            <div className={`absolute ${openDropdown === 'Documentary' ? 'block' : 'hidden'} bg-white text-gray-800 p-2 mt-1 rounded shadow-md`}>
              <Link href="/documentaries/videos" className="block px-4 py-2 hover:bg-gray-100">Videos</Link>
            </div>
          </div>
           <div className="relative group" ref={dropdownRefs['Research and Reports']}>
            <button
              className="hover:text-gray-200 flex items-center"
               onClick={() => handleDropdownClick('Research and Reports')}
            >
              Research and Reports <span className="ml-1">&#9660;</span>
            </button>
            <div className={`absolute ${openDropdown === 'Research and Reports' ? 'block' : 'hidden'} bg-white text-gray-800 p-2 mt-1 rounded shadow-md`}>
              <Link href="/research/pdfs" className="block px-4 py-2 hover:bg-gray-100">Bookshelf</Link>
            </div>
          </div>
           <div className="relative group" ref={dropdownRefs['Gallery']}>
            <button
              className="hover:text-gray-200 flex items-center"
              onClick={() => handleDropdownClick('Gallery')}
            >
              Gallery <span className="ml-1">&#9660;</span>
            </button>
            <div className={`absolute ${openDropdown === 'Gallery' ? 'block' : 'hidden'} bg-white text-gray-800 p-2 mt-1 rounded shadow-md`}>
              <Link href="/gallery/photos" className="block px-4 py-2 hover:bg-gray-100">Photos</Link>
            </div>
          </div>
          <Link href="/contact" className="hover:text-gray-200">Contact Us</Link>
        </div>
        <div className="flex items-center space-x-4">
          {/* Conditional rendering for create, edit, login, and logout */}
          {/* Add logic here to conditionally render these links */}
          <Link href="/create" className="hover:text-gray-200">Create</Link>
          <Link href="/edit" className="hover:text-gray-200">Edit</Link>
          <Link href="/login" className="hover:text-gray-200">Login</Link>
          {/* <Link href="/logout" className="hover:text-gray-200">Logout</Link> */}
          <button className="hover:text-gray-200">🌙</button>
        </div>
      </div>
    </nav>
  );
}