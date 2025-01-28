"use client";

import { useReducer, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { FaSun, FaMoon, FaChevronDown, FaChevronUp, FaBars, FaTimes } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "@/context/ThemeContext";
import { useAuth } from "@/context/AuthContext";
import Image from "next/image";
import sitelogo from "@/assets/images/sitelogo.png";

interface NavState {
  openMenu: string | null;
  isMobileMenuOpen: boolean;
}

type NavAction = 
  | { type: "TOGGLE_MENU"; payload: string }
  | { type: "CLOSE_MENU" }
  | { type: "TOGGLE_MOBILE_MENU" }
  | { type: "CLOSE_ALL" };

const initialState: NavState = {
  openMenu: null,
  isMobileMenuOpen: false,
};

function reducer(state: NavState, action: NavAction): NavState {
  switch (action.type) {
    case "TOGGLE_MENU":
      return {
        ...state,
        openMenu: state.openMenu === action.payload ? null : action.payload,
      };
    case "CLOSE_MENU":
      return {
        ...state,
        openMenu: null,
      };
    case "TOGGLE_MOBILE_MENU":
      return {
        ...state,
        isMobileMenuOpen: !state.isMobileMenuOpen,
      };
    case "CLOSE_ALL":
      return {
        ...state,
        openMenu: null,
        isMobileMenuOpen: false,
      };
    default:
      return state;
  }
}

interface SubMenuProps {
  title: string;
  items: Array<{ name: string; link: string }>;
  isOpen: boolean;
  toggleMenu: () => void;
  closeMenu: () => void;
  isMobile: boolean;
  theme: string;
}

const SubMenu = ({
  title,
  items,
  isOpen,
  toggleMenu,
  closeMenu,
  isMobile,
  theme,
}: SubMenuProps) => {
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (menuRef.current && !menuRef.current.contains(target)) {
        closeMenu();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, closeMenu]);

  return (
    <div ref={menuRef} className={`${isMobile ? "w-full" : "relative group"}`}>
      <div
        onClick={toggleMenu}
        className="flex items-center justify-between w-full text-white hover:text-gray-200 py-2 cursor-pointer"
      >
        <span className="flex-grow text-left">{title}</span>
        <span className="ml-1 transition-transform duration-200">
          {isOpen ? <FaChevronUp /> : <FaChevronDown />}
        </span>
      </div>
      <AnimatePresence mode="wait">
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className={`${
              isMobile
                ? "w-full"
                : "absolute left-0 mt-2 bg-white rounded-md shadow-xl"
            } overflow-hidden z-20 ${theme === "dark" ? "bg-gray-800" : "bg-teal-700"}`}
          >
            {items.map((item, index) => (
              <Link
                key={index}
                href={item.link}
                className={`block px-4 py-2 text-sm ${
                  isMobile
                    ? `text-white hover:${theme === "dark" ? "bg-gray-700" : "bg-teal-600"}`
                    : "text-gray-700 hover:bg-gray-100"
                } whitespace-nowrap transition-colors duration-200`}
                onClick={closeMenu}
              >
                {item.name}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default function NavBar() {
  const { theme, toggleTheme } = useTheme();
  const { user, logout } = useAuth();
  const pathname = usePathname();
  const router = useRouter();
  const [state, dispatch] = useReducer(reducer, initialState);
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    dispatch({ type: "CLOSE_ALL" });
  }, [pathname]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (
        navRef.current &&
        !navRef.current.contains(target) &&
        !target.closest(".hamburger-button")
      ) {
        dispatch({ type: "CLOSE_ALL" });
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      router.push("/");
    } catch (error) {
      console.error("Failed to log out", error);
    }
  };

  const toggleMenu = (menu: string) => {
    dispatch({ type: "TOGGLE_MENU", payload: menu });
  };

  const closeMenu = () => {
    dispatch({ type: "CLOSE_MENU" });
  };

  const aboutUsItems = [
    { name: "Who We Are", link: "/about/who-we-are" },
    { name: "What We Do", link: "/about/what-we-do" },
  ];

  const docsItems = [
    { name: "Videos", link: "/documentaries/videos" },
  ];

  const researchItems = [
    { name: "Bookshelf", link: "/research/pdfs" },
  ];

  const galleryItems = [
    { name: "Photos", link: "/gallery/photos" },
  ];

  return (
    <nav 
      ref={navRef}
      className={`${theme === "dark" ? "bg-gray-900" : "bg-teal-700"} w-full sticky top-0 z-50`}
    >
      {/* Desktop Navigation */}
      <div className="hidden lg:block">
        <div className="max-w-7xl mx-auto px-4">
          {/* Top Row */}
          <div className="flex items-center justify-between py-2">
            <div className="flex items-center space-x-4">
              <Link href="/" className="text-white hover:text-gray-200">
                Home
              </Link>
              <Link href="/search" className="text-white hover:text-gray-200">
                Search
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              {user && (
                <>
                  <Link href="/create" className="text-white hover:text-gray-200">
                    Create
                  </Link>
                  <Link href="/edit" className="text-white hover:text-gray-200">
                    Edit
                  </Link>
                </>
              )}
              {user ? (
                <button
                  onClick={handleLogout}
                  className="text-white hover:text-gray-200"
                >
                  Logout
                </button>
              ) : (
                <Link href="/login" className="text-white hover:text-gray-200">
                  Login
                </Link>
              )}
              <button onClick={toggleTheme} className="text-white p-2">
                {theme === "dark" ? <FaSun size={20} /> : <FaMoon size={20} />}
              </button>
            </div>
          </div>

          {/* Middle Row */}
          <div className="flex justify-center py-4">
            <Link href="/" className="flex items-center group">
              <div className="w-16 h-16 mr-2 relative">
                <Image
                  src={sitelogo}
                  alt="Site Logo"
                  fill
                  className="object-contain group-hover:opacity-80 transition-opacity duration-200"
                />
              </div>
              <span className="text-white text-2xl font-bold group-hover:text-gray-200 transition-colors duration-200 whitespace-nowrap">
                Travel To End FGM
              </span>
            </Link>
          </div>

          {/* Bottom Row */}
          <div className="flex items-center justify-center space-x-6 py-2">
            <div className="submenu-container">
              <SubMenu
                title="About Us"
                items={aboutUsItems}
                isOpen={state.openMenu === "aboutUs"}
                toggleMenu={() => toggleMenu("aboutUs")}
                closeMenu={closeMenu}
                isMobile={false}
                theme={theme}
              />
            </div>
            <Link href="/impact-stories" className="text-white hover:text-gray-200">
              Stories
            </Link>
            <div className="submenu-container">
              <SubMenu
                title="Documentary"
                items={docsItems}
                isOpen={state.openMenu === "docs"}
                toggleMenu={() => toggleMenu("docs")}
                closeMenu={closeMenu}
                isMobile={false}
                theme={theme}
              />
            </div>
            <div className="submenu-container">
              <SubMenu
                title="Research and Reports"
                items={researchItems}
                isOpen={state.openMenu === "research"}
                toggleMenu={() => toggleMenu("research")}
                closeMenu={closeMenu}
                isMobile={false}
                theme={theme}
              />
            </div>
            <div className="submenu-container">
              <SubMenu
                title="Gallery"
                items={galleryItems}
                isOpen={state.openMenu === "gallery"}
                toggleMenu={() => toggleMenu("gallery")}
                closeMenu={closeMenu}
                isMobile={false}
                theme={theme}
              />
            </div>
            <Link href="/contact" className="text-white hover:text-gray-200">
              Contact Us
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="lg:hidden">
        <div className="flex items-center justify-between p-4">
          <Link href="/" className="flex items-center group">
            <div className="w-12 h-12 mr-2 relative">
              <Image
                src={sitelogo}
                alt="Site Logo"
                fill
                className="object-contain group-hover:opacity-80 transition-opacity duration-200"
              />
            </div>
            <span className="text-white text-xl font-bold group-hover:text-gray-200 transition-colors duration-200 whitespace-nowrap">
              Travel To End FGM
            </span>
          </Link>
          <button
            onClick={(e) => {
              e.stopPropagation();
              dispatch({ type: "TOGGLE_MOBILE_MENU" });
            }}
            className="text-white p-2 hamburger-button"
          >
            {state.isMobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {state.isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
              className={`w-full mobile-menu-container overflow-y-auto overscroll-none max-h-[calc(100vh-4rem)] ${
                theme === "dark" ? "bg-gray-800" : "bg-teal-700"
              }`}
              style={{
                WebkitOverflowScrolling: 'touch',
                scrollBehavior: 'smooth'
              }}
            >
              <div className="flex flex-col space-y-2 p-4 min-h-[calc(100vh-4rem)] touch-pan-y">
                <Link
                  href="/"
                  className="text-white hover:text-gray-200 py-2"
                  onClick={() => dispatch({ type: "CLOSE_ALL" })}
                >
                  Home
                </Link>
                <Link
                  href="/search"
                  className="text-white hover:text-gray-200 py-2"
                  onClick={() => dispatch({ type: "CLOSE_ALL" })}
                >
                  Search
                </Link>
                <SubMenu
                  title="About Us"
                  items={aboutUsItems}
                  isOpen={state.openMenu === "aboutUs"}
                  toggleMenu={() => toggleMenu("aboutUs")}
                  closeMenu={closeMenu}
                  isMobile={true}
                  theme={theme}
                />
                <Link
                  href="/impact-stories"
                  className="text-white hover:text-gray-200 py-2"
                  onClick={() => dispatch({ type: "CLOSE_ALL" })}
                >
                  Stories
                </Link>
                <SubMenu
                  title="Documentary"
                  items={docsItems}
                  isOpen={state.openMenu === "docs"}
                  toggleMenu={() => toggleMenu("docs")}
                  closeMenu={closeMenu}
                  isMobile={true}
                  theme={theme}
                />
                <SubMenu
                  title="Research and Reports"
                  items={researchItems}
                  isOpen={state.openMenu === "research"}
                  toggleMenu={() => toggleMenu("research")}
                  closeMenu={closeMenu}
                  isMobile={true}
                  theme={theme}
                />
                <SubMenu
                  title="Gallery"
                  items={galleryItems}
                  isOpen={state.openMenu === "gallery"}
                  toggleMenu={() => toggleMenu("gallery")}
                  closeMenu={closeMenu}
                  isMobile={true}
                  theme={theme}
                />
                <Link
                  href="/contact"
                  className="text-white hover:text-gray-200 py-2"
                  onClick={() => dispatch({ type: "CLOSE_ALL" })}
                >
                  Contact Us
                </Link>
                {user && (
                  <>
                    <Link
                      href="/create"
                      className="text-white hover:text-gray-200 py-2"
                      onClick={() => dispatch({ type: "CLOSE_ALL" })}
                    >
                      Create
                    </Link>
                    <Link
                      href="/edit"
                      className="text-white hover:text-gray-200 py-2"
                      onClick={() => dispatch({ type: "CLOSE_ALL" })}
                    >
                      Edit
                    </Link>
                  </>
                )}
                <div className="flex items-center justify-between mt-4">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleTheme();
                    }}
                    className="text-white p-2"
                  >
                    {theme === "dark" ? <FaSun size={24} /> : <FaMoon size={24} />}
                  </button>
                  {user ? (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleLogout();
                      }}
                      className="text-white hover:text-gray-200"
                    >
                      Logout
                    </button>
                  ) : (
                    <Link
                      href="/login"
                      className="text-white hover:text-gray-200"
                      onClick={() => dispatch({ type: "CLOSE_ALL" })}
                    >
                      Login
                    </Link>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}