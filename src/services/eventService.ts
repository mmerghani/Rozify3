import { Event, WishlistItem } from '../types';
import { v4 as uuidv4 } from 'uuid';
import { useAnalytics } from '../lib/analytics';
import toast from 'react-hot-toast';

const EVENTS_KEY = 'rozify_events';

export class EventService {
  static createEvent(eventData: Partial<Event>, userId: string): Event {
    try {
      const newEvent: Event = {
        id: uuidv4(),
        title: eventData.title || '',
        date: eventData.date || '',
        time: eventData.time || '',
        description: eventData.description || '',
        host: eventData.host || '',
        location: eventData.location || '',
        wishlist: [],
        template: eventData.template,
        attachments: eventData.attachments || [],
        createdBy: userId,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      const events = this.getEvents();
      const updatedEvents = {
        ...events,
        [newEvent.id]: newEvent,
      };
      
      localStorage.setItem(EVENTS_KEY, JSON.stringify(updatedEvents));
      
      const analytics = useAnalytics.getState();
      analytics.addActivityLog({
        type: 'event_created',
        message: `New event "${newEvent.title}" created`,
        userId: newEvent.createdBy,
        eventId: newEvent.id,
      });

      toast.success('Event created successfully!');
      return newEvent;
    } catch (error) {
      console.error('Error creating event:', error);
      toast.error('Failed to create event');
      throw new Error('Failed to create event');
    }
  }

  static getEvents(): Record<string, Event> {
    try {
      const eventsJson = localStorage.getItem(EVENTS_KEY);
      return eventsJson ? JSON.parse(eventsJson) : {};
    } catch (error) {
      console.error('Error getting events:', error);
      return {};
    }
  }

  static getEvent(id: string): Event | null {
    try {
      const events = this.getEvents();
      return events[id] || null;
    } catch (error) {
      console.error('Error getting event:', error);
      return null;
    }
  }

  static updateEvent(event: Event): void {
    try {
      const events = this.getEvents();
      events[event.id] = {
        ...event,
        updatedAt: new Date().toISOString(),
      };
      localStorage.setItem(EVENTS_KEY, JSON.stringify(events));
      toast.success('Event updated successfully!');
    } catch (error) {
      console.error('Error updating event:', error);
      toast.error('Failed to update event');
      throw new Error('Failed to update event');
    }
  }

  static updateWishlistItem(eventId: string, item: WishlistItem): void {
    try {
      const event = this.getEvent(eventId);
      if (!event) throw new Error('Event not found');

      const updatedEvent = {
        ...event,
        wishlist: event.wishlist.some(i => i.id === item.id)
          ? event.wishlist.map(i => i.id === item.id ? item : i)
          : [...event.wishlist, item],
        updatedAt: new Date().toISOString(),
      };

      this.updateEvent(updatedEvent);

      const analytics = useAnalytics.getState();
      analytics.addActivityLog({
        type: 'wishlist_updated',
        message: `Wishlist item "${item.name}" ${item.id ? 'updated' : 'added'}`,
        userId: event.createdBy,
        eventId: event.id,
      });

      toast.success('Wishlist updated successfully!');
    } catch (error) {
      console.error('Error updating wishlist item:', error);
      toast.error('Failed to update wishlist');
      throw new Error('Failed to update wishlist item');
    }
  }
}