import { z } from 'zod';

export const eventFormSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  date: z.string().min(1, 'Date is required'),
  time: z.string().min(1, 'Time is required'),
  description: z.string().min(1, 'Description is required'),
  host: z.string().min(1, 'Host name is required'),
  location: z.string().min(1, 'Location is required'),
});

export type EventFormData = z.infer<typeof eventFormSchema>;