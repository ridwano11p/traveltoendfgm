"use client";

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useTheme } from '@/context/ThemeContext';
import { useAuth } from '@/context/AuthContext';
import { FaEnvelope, FaLock, FaSignInAlt, FaSpinner } from 'react-icons/fa';
import { loginUser } from './actions';

interface FormState {
  email: string;
  password: string;
}

export default function LoginPage() {
  const [formState, setFormState] = useState<FormState>({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { darkMode } = useTheme();
  const { user, setUser } = useAuth();
  const router = useRouter();

  // Clear error when form state changes
  useEffect(() => {
    if (error) setError('');
  }, [formState, error]);

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      router.push('/');
    }
  }, [user, router]);

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({
      ...prev,
      [name]: value
    }));
  }, []);

  const handleSubmit = useCallback((e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (loading) return;

    setError('');
    setLoading(true);

    // Validate inputs
    if (!formState.email || !formState.password) {
      setError('Please fill in all fields');
      setLoading(false);
      return;
    }

    loginUser(formState.email, formState.password)
      .then((result) => {
        if (result.success && result.user) {
          // Only set serialized user data
          setUser({
            uid: result.user.uid,
            email: result.user.email,
            emailVerified: result.user.emailVerified
          });
          router.push('/');
        } else {
          setError(result.error || 'An unexpected error occurred');
          if (result.errorCode) {
            console.error('Login error code:', result.errorCode);
          }
        }
      })
      .catch((error) => {
        console.error('Unexpected error during login:', error);
        setError('An unexpected error occurred. Please try again.');
      })
      .finally(() => {
        setLoading(false);
      });
  }, [loading, formState, setUser, router]);

  // Early return if already logged in
  if (user) {
    return null;
  }

  return (
    <div className={`min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 ${darkMode ? 'bg-gray-800' : 'bg-[#90d2dc]'}`}>
      <div className={`max-w-md w-full space-y-8 ${darkMode ? 'bg-gray-700' : 'bg-white'} p-10 rounded-xl shadow-md`}>
        <div>
          <h2 className={`mt-6 text-center text-3xl font-extrabold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            Sign in to your account
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit} noValidate>
          <div className="rounded-md shadow-sm space-y-4">
            <div>
              <label htmlFor="email-address" className={`block text-sm font-medium ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                Email address
              </label>
              <div className="relative mt-1">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaEnvelope className={`h-5 w-5 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} aria-hidden="true" />
                </div>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className={`appearance-none block w-full px-3 py-2 pl-10 ${
                    darkMode
                      ? 'bg-gray-600 text-white placeholder-gray-400 border-gray-500 focus:ring-blue-500 focus:border-blue-500'
                      : 'border-gray-300 placeholder-gray-500 text-gray-900 focus:ring-blue-500 focus:border-blue-500'
                  } rounded-md focus:outline-none focus:ring-2 sm:text-sm`}
                  placeholder="Email address"
                  value={formState.email}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div>
              <label htmlFor="password" className={`block text-sm font-medium ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                Password
              </label>
              <div className="relative mt-1">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaLock className={`h-5 w-5 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} aria-hidden="true" />
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className={`appearance-none block w-full px-3 py-2 pl-10 ${
                    darkMode
                      ? 'bg-gray-600 text-white placeholder-gray-400 border-gray-500 focus:ring-blue-500 focus:border-blue-500'
                      : 'border-gray-300 placeholder-gray-500 text-gray-900 focus:ring-blue-500 focus:border-blue-500'
                  } rounded-md focus:outline-none focus:ring-2 sm:text-sm`}
                  placeholder="Password"
                  value={formState.password}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>

          {error && (
            <div className="rounded-md bg-red-50 dark:bg-red-900/50 p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className={`text-sm ${darkMode ? 'text-red-200' : 'text-red-800'}`}>
                    {error}
                  </p>
                </div>
              </div>
            </div>
          )}

          <div>
            <button
              type="submit"
              disabled={loading}
              className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white ${
                darkMode
                  ? 'bg-blue-600 hover:bg-blue-700 focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
                  : 'bg-blue-600 hover:bg-blue-700 focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
              } focus:outline-none transition duration-150 ease-in-out ${loading ? 'opacity-75 cursor-not-allowed' : ''}`}
            >
              <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                {loading ? (
                  <FaSpinner className="h-5 w-5 text-white animate-spin" aria-hidden="true" />
                ) : (
                  <FaSignInAlt className="h-5 w-5 text-white" aria-hidden="true" />
                )}
              </span>
              {loading ? 'Signing in...' : 'Sign in'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}