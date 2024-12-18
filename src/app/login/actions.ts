'use client';

import { signInWithEmailAndPassword, AuthError, Auth } from 'firebase/auth';
import { auth as firebaseAuth } from '@/lib/firebase/config';

type LoginResponse = {
  success: boolean;
  user?: {
    uid: string;
    email: string | null;
    emailVerified: boolean;
  };
  error?: string;
  errorCode?: string;
};

function getAuth(): Auth {
  if (!firebaseAuth) {
    throw new Error('Authentication is not initialized');
  }
  return firebaseAuth;
}

export async function loginUser(email: string, password: string): Promise<LoginResponse> {
  if (!email || !password) {
    return {
      success: false,
      error: 'Email and password are required',
      errorCode: 'auth/invalid-input'
    };
  }

  try {
    const auth = getAuth();
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    
    // Only return necessary user data
    const userData = {
      uid: userCredential.user.uid,
      email: userCredential.user.email,
      emailVerified: userCredential.user.emailVerified,
    };

    return {
      success: true,
      user: userData
    };
  } catch (error) {
    // Handle initialization error
    if (error instanceof Error && error.message === 'Authentication is not initialized') {
      return {
        success: false,
        error: 'Authentication service is not available',
        errorCode: 'auth/not-initialized'
      };
    }

    const authError = error as AuthError;
    console.error('Login error:', {
      code: authError.code,
      message: authError.message,
      email: email,
      timestamp: new Date().toISOString()
    });

    switch (authError.code) {
      case 'auth/invalid-email':
        return {
          success: false,
          error: 'Invalid email address format.',
          errorCode: authError.code
        };
      case 'auth/user-disabled':
        return {
          success: false,
          error: 'This account has been disabled.',
          errorCode: authError.code
        };
      case 'auth/user-not-found':
        return {
          success: false,
          error: 'No account found with this email.',
          errorCode: authError.code
        };
      case 'auth/wrong-password':
        return {
          success: false,
          error: 'Incorrect password.',
          errorCode: authError.code
        };
      case 'auth/too-many-requests':
        return {
          success: false,
          error: 'Too many failed login attempts. Please try again later.',
          errorCode: authError.code
        };
      case 'auth/network-request-failed':
        return {
          success: false,
          error: 'Network error. Please check your internet connection.',
          errorCode: authError.code
        };
      default:
        return {
          success: false,
          error: 'An error occurred during login. Please try again.',
          errorCode: authError.code
        };
    }
  }
}