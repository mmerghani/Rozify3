import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Settings } from 'lucide-react';
import { LoginButton } from './LoginButton';
import { LanguageToggle } from './LanguageToggle';
import { Logo } from './Logo';
import { useAuth0 } from '@auth0/auth0-react';
import { useTranslation } from '../hooks/useTranslation';
import { isAdmin } from '../lib/auth/authConfig';

export function Header() {
  const { isAuthenticated, user } = useAuth0();
  const { t } = useTranslation();

  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-4">
        <nav className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <Logo />
          </Link>
          <div className="flex items-center space-x-6">
            <LanguageToggle />
            {isAuthenticated && (
              <>
                <Link
                  to="/create-event"
                  className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-purple-600 text-white hover:bg-purple-700 transition-colors"
                >
                  <Calendar className="h-5 w-5" />
                  <span>{t('Create Event')}</span>
                </Link>
                {isAdmin(user) && (
                  <Link
                    to="/admin"
                    className="flex items-center space-x-2 px-4 py-2 rounded-lg border border-purple-200 text-purple-600 hover:bg-purple-50 transition-colors"
                  >
                    <Settings className="h-5 w-5" />
                    <span>{t('Admin Dashboard')}</span>
                  </Link>
                )}
              </>
            )}
            <LoginButton />
          </div>
        </nav>
      </div>
    </header>
  );
}