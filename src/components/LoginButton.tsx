import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { LogIn } from 'lucide-react';
import toast from 'react-hot-toast';

export function LoginButton() {
  const { loginWithRedirect, isLoading, isAuthenticated } = useAuth0();

  if (isAuthenticated) return null;

  const handleLogin = async (connection: string) => {
    try {
      await loginWithRedirect({
        appState: {
          returnTo: window.location.pathname,
        },
        authorizationParams: {
          connection,
          screen_hint: 'signup',
          prompt: 'login',
        },
      });
    } catch (error) {
      console.error('Login error:', error);
      toast.error('Failed to login. Please try again.');
    }
  };

  return (
    <div className="flex items-center space-x-3">
      <button
        onClick={() => handleLogin('google-oauth2')}
        disabled={isLoading}
        className="flex items-center space-x-2 px-4 py-2 bg-white text-gray-800 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors disabled:opacity-50"
      >
        <img 
          src="https://www.google.com/favicon.ico" 
          alt="Google" 
          className="w-5 h-5"
          onError={(e) => {
            e.currentTarget.src = 'https://accounts.google.com/favicon.ico';
          }}
        />
        <span>Continue with Google</span>
      </button>

      <button
        onClick={() => handleLogin('apple')}
        disabled={isLoading}
        className="flex items-center space-x-2 px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-900 transition-colors disabled:opacity-50"
      >
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
          <path d="M17.05 20.28c-.98.95-2.05.88-3.08.41-1.09-.47-2.07-.48-3.23 0-1.44.62-2.2.44-3.06-.41C2.32 15.03 3.23 7.63 9.08 7.31c1.44.07 2.45.97 3.23.97.75 0 2.19-.97 3.89-.83 1.37.11 2.61.72 3.44 1.9-3.19 1.95-2.67 6.22.41 7.67-.95 1.88-2.19 3.69-3 3.26zM15.84 6.41c.79-1.02 1.44-2.43 1.23-3.89-1.37.07-2.95.96-3.87 2.05-.84.98-1.51 2.39-1.23 3.76 1.47.11 2.98-.83 3.87-1.92z"/>
        </svg>
        <span>Continue with Apple</span>
      </button>
    </div>
  );
}