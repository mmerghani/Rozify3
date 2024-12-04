import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Bell, Mail, Shield } from 'lucide-react';
import { useAuth } from '../../lib/auth';
import { profileSchema } from '../../lib/validation';
import toast from 'react-hot-toast';

interface NotificationSettings {
  emailNotifications: boolean;
  eventReminders: boolean;
  wishlistUpdates: boolean;
}

export function ProfileSettings() {
  const { user, updateProfile } = useAuth();
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: user?.name || '',
      email: user?.email || '',
      notifications: user?.notifications || {
        emailNotifications: true,
        eventReminders: true,
        wishlistUpdates: true,
      },
    },
  });

  const onSubmit = async (data: any) => {
    try {
      await updateProfile(data);
      toast.success('Profile settings updated successfully');
    } catch (error) {
      toast.error('Failed to update profile settings');
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Profile Settings</h2>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Personal Information</h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Name</label>
              <input
                type="text"
                {...register('name')}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-600">{errors.name.message as string}</p>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                {...register('email')}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">{errors.email.message as string}</p>
              )}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Notification Preferences</h3>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="text-sm font-medium text-gray-900">Email Notifications</p>
                  <p className="text-sm text-gray-500">Receive updates via email</p>
                </div>
              </div>
              <input
                type="checkbox"
                {...register('notifications.emailNotifications')}
                className="rounded text-purple-600 focus:ring-purple-500"
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Bell className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="text-sm font-medium text-gray-900">Event Reminders</p>
                  <p className="text-sm text-gray-500">Get notified about upcoming events</p>
                </div>
              </div>
              <input
                type="checkbox"
                {...register('notifications.eventReminders')}
                className="rounded text-purple-600 focus:ring-purple-500"
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Shield className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="text-sm font-medium text-gray-900">Wishlist Updates</p>
                  <p className="text-sm text-gray-500">Receive notifications when items are reserved</p>
                </div>
              </div>
              <input
                type="checkbox"
                {...register('notifications.wishlistUpdates')}
                className="rounded text-purple-600 focus:ring-purple-500"
              />
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-2 px-4 rounded-md hover:from-purple-700 hover:to-pink-700 transition-colors"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
}