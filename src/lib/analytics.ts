import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Event, ActivityLog } from '../types';

interface AnalyticsState {
  activityLogs: ActivityLog[];
  addActivityLog: (log: Omit<ActivityLog, 'id' | 'timestamp'>) => void;
  getEventAnalytics: () => {
    totalEvents: number;
    activeEvents: number;
    completedEvents: number;
    totalWishlists: number;
  };
  getUserAnalytics: () => {
    totalUsers: number;
    activeUsers: number;
    newUsersThisMonth: number;
  };
}

export const useAnalytics = create<AnalyticsState>()(
  persist(
    (set, get) => ({
      activityLogs: [],
      addActivityLog: (log) => {
        const newLog: ActivityLog = {
          ...log,
          id: crypto.randomUUID(),
          timestamp: new Date().toISOString(),
        };
        set((state) => ({
          activityLogs: [newLog, ...state.activityLogs].slice(0, 1000), // Keep last 1000 logs
        }));
      },
      getEventAnalytics: () => {
        const now = new Date();
        const events = Object.values(localStorage.getItem('events') || '{}');
        return {
          totalEvents: events.length,
          activeEvents: events.filter((event: Event) => new Date(event.date) >= now).length,
          completedEvents: events.filter((event: Event) => new Date(event.date) < now).length,
          totalWishlists: events.reduce((acc: number, event: Event) => acc + event.wishlist.length, 0),
        };
      },
      getUserAnalytics: () => {
        const users = Object.values(localStorage.getItem('users') || '{}');
        const now = new Date();
        const monthAgo = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate());
        return {
          totalUsers: users.length,
          activeUsers: users.filter((user: any) => new Date(user.lastActive) >= monthAgo).length,
          newUsersThisMonth: users.filter((user: any) => new Date(user.createdAt) >= monthAgo).length,
        };
      },
    }),
    {
      name: 'analytics-storage',
    }
  )
);