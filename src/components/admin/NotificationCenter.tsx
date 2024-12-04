import React from 'react';
import { Bell, Mail, AlertTriangle } from 'lucide-react';

export function NotificationCenter() {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Notification Center</h3>
      <div className="space-y-4">
        <div className="flex items-start space-x-3 p-3 bg-purple-50 rounded-lg">
          <Bell className="h-5 w-5 text-purple-600" />
          <div>
            <p className="text-sm font-medium text-gray-900">Event Reminders</p>
            <p className="text-sm text-gray-500">5 upcoming events need attention</p>
          </div>
        </div>
        
        <div className="flex items-start space-x-3 p-3 bg-pink-50 rounded-lg">
          <Mail className="h-5 w-5 text-pink-600" />
          <div>
            <p className="text-sm font-medium text-gray-900">Email Notifications</p>
            <p className="text-sm text-gray-500">3 emails pending review</p>
          </div>
        </div>
        
        <div className="flex items-start space-x-3 p-3 bg-yellow-50 rounded-lg">
          <AlertTriangle className="h-5 w-5 text-yellow-600" />
          <div>
            <p className="text-sm font-medium text-gray-900">System Alerts</p>
            <p className="text-sm text-gray-500">2 alerts require attention</p>
          </div>
        </div>
      </div>
    </div>
  );
}