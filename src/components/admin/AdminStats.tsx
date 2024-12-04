import React from 'react';
import { Users, Calendar, Gift, Activity } from 'lucide-react';

interface AdminStatsProps {
  analytics: {
    event: {
      totalEvents: number;
      activeEvents: number;
      completedEvents: number;
      totalWishlists: number;
    };
    user: {
      totalUsers: number;
      activeUsers: number;
      newUsersThisMonth: number;
    };
  };
}

export function AdminStats({ analytics }: AdminStatsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Total Users</h3>
          <Users className="h-6 w-6 text-purple-600" />
        </div>
        <p className="text-3xl font-bold text-gray-900">{analytics.user.totalUsers}</p>
        <p className="text-sm text-gray-500 mt-2">
          +{analytics.user.newUsersThisMonth} this month
        </p>
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Active Events</h3>
          <Calendar className="h-6 w-6 text-purple-600" />
        </div>
        <p className="text-3xl font-bold text-gray-900">{analytics.event.activeEvents}</p>
        <p className="text-sm text-gray-500 mt-2">
          {analytics.event.completedEvents} completed
        </p>
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Total Wishlists</h3>
          <Gift className="h-6 w-6 text-purple-600" />
        </div>
        <p className="text-3xl font-bold text-gray-900">{analytics.event.totalWishlists}</p>
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Active Users</h3>
          <Activity className="h-6 w-6 text-purple-600" />
        </div>
        <p className="text-3xl font-bold text-gray-900">{analytics.user.activeUsers}</p>
        <p className="text-sm text-gray-500 mt-2">Last 30 days</p>
      </div>
    </div>
  );
}