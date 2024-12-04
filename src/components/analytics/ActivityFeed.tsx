import React from 'react';
import { format } from 'date-fns';
import { useAnalytics } from '../../lib/analytics';
import { ActivityLog } from '../../types';

export function ActivityFeed() {
  const { activityLogs } = useAnalytics();

  const getActivityIcon = (type: ActivityLog['type']) => {
    switch (type) {
      case 'event_created':
        return '🎉';
      case 'wishlist_updated':
        return '🎁';
      case 'user_joined':
        return '👋';
      case 'item_reserved':
        return '✅';
      default:
        return '📝';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
      <div className="space-y-4">
        {activityLogs.length === 0 ? (
          <p className="text-gray-500">No recent activity</p>
        ) : (
          activityLogs.slice(0, 10).map((log) => (
            <div key={log.id} className="flex items-start space-x-3">
              <span className="text-2xl">{getActivityIcon(log.type)}</span>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-gray-900">{log.message}</p>
                <p className="text-xs text-gray-500">
                  {format(new Date(log.timestamp), 'PPp')}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}