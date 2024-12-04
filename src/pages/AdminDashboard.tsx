import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import { AdminStats } from '../components/admin/AdminStats';
import { NotificationCenter } from '../components/admin/NotificationCenter';
import { UserManagement } from '../components/admin/UserManagement';
import { useAnalytics } from '../lib/analytics';
import { isAdmin } from '../lib/auth/authConfig';
import toast from 'react-hot-toast';

export function AdminDashboard() {
  const { user, isAuthenticated, isLoading } = useAuth0();
  const { getEventAnalytics, getUserAnalytics } = useAnalytics();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  if (!isAuthenticated || !isAdmin(user)) {
    toast.error('You do not have permission to access this page');
    return <Navigate to="/" replace />;
  }

  const analytics = {
    event: getEventAnalytics(),
    user: getUserAnalytics()
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Admin Dashboard</h1>
      
      <AdminStats analytics={analytics} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <NotificationCenter />
        <UserManagement />
      </div>
    </div>
  );
}