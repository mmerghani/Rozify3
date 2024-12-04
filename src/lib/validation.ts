import { z } from 'zod';

export const eventSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  date: z.string().min(1, 'Date is required'),
  time: z.string().min(1, 'Time is required'),
  description: z.string().min(1, 'Description is required'),
  host: z.string().min(1, 'Host name is required'),
  location: z.string().min(1, 'Location is required'),
  template: z.string().optional(),
  attachments: z.array(z.object({
    id: z.string(),
    name: z.string(),
    url: z.string(),
    type: z.string()
  })).optional()
});

export const wishlistItemSchema = z.object({
  name: z.string().min(1, 'Item name is required'),
  description: z.string().min(1, 'Description is required'),
  price: z.number().min(0, 'Price must be positive'),
  url: z.string().url().optional()
});

export const profileSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
  notifications: z.object({
    emailNotifications: z.boolean(),
    eventReminders: z.boolean(),
    wishlistUpdates: z.boolean(),
  }),
});