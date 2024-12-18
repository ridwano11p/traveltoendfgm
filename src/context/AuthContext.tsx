"use client";

import { createContext, useContext, useEffect, useState } from 'react';
import { User, onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '@/lib/firebase/config';
import { useRouter } from 'next/navigation';

type SerializedUser = {
  uid: string;
  email: string | null;
  emailVerified: boolean;
} | null;

type AuthContextType = {
  user: SerializedUser;
  loading: boolean;
  logout: () => void;
  setUser: (user: SerializedUser) => void;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  logout: () => {},
  setUser: () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<SerializedUser>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    let unsubscribe: () => void;

    try {
      unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
        if (firebaseUser) {
          // Serialize user data to prevent circular references
          setUser({
            uid: firebaseUser.uid,
            email: firebaseUser.email,
            emailVerified: firebaseUser.emailVerified,
          });
        } else {
          setUser(null);
        }
        setLoading(false);
      });
    } catch (error) {
      console.error('Error setting up auth state listener:', error);
      setLoading(false);
    }

    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, []);

  const logout = () => {
    try {
      signOut(auth)
        .then(() => {
          setUser(null);
          // Clear any session cookies
          document.cookie = 'auth-session=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT';
          router.push('/');
        })
        .catch((error) => {
          console.error('Failed to log out', error);
        });
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  const value = {
    user,
    loading,
    logout,
    setUser
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;