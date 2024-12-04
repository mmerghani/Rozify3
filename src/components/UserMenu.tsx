import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { LogOut, User, Settings } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../lib/auth';

export function UserMenu() {
  const { logout } = useAuth0();
  const { user } = useAuth();

  if (!user) return null;

  return (
    <div className="relative group">
      <button className="flex items-center space-x-2">
        {user.picture ? (
          <img
            src={user.picture}
            alt={user.name}
            className="w-8 h-8 rounded-full"
          />
        ) : (
          <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center">
            <User className="h-4 w-4 text-purple-600" />
          </div>
        )}
      </button>
      
      <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-1 invisible group-hover:visible">
        <div className="px-4 py-2 border-b border-gray-100">
          <p className="text-sm font-medium text-gray-900">{user.name}</p>
          <p className="text-sm text-gray-500">{user.email}</p>
        </div>
        
        {user.role === 'admin' && (
          <Link
            to="/admin"
            className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          >
            <Settings className="h-4 w-4" />
            <span>Admin Dashboard</span>
          </Link>
        )}
        
        <button
          onClick={() => logout()}
          className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full"
        >
          <LogOut className="h-4 w-4" />
          <span>Log Out</span>
        </button>
      </div>
    </div>
  );
}