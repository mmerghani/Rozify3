import { v4 as uuidv4 } from 'uuid';
import { Event } from '../../types';
import { useEventStore } from './eventStore';
import { useAnalytics } from '../analytics';
import toast from 'react-hot-toast';

const EVENTS_KEY = 'rozify_events';

export class EventService {
  static createEvent(eventData: Partial<Event>): Event {
    try {
      if (!eventData.title || !eventData.date || !eventData.location) {
        throw new Error('Missing required event data');
      }

      const newEvent: Event = {
        id: uuidv4(),
        title: eventData.title,
        date: eventData.date,
        time: eventData.time || '',
        description: eventData.description || '',
        host: eventData.host || '',
        location: eventData.location,
        wishlist: [],
        template: eventData.template,
        attachments: eventData.attachments || [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      const events = this.getEvents();
      const updatedEvents = {
        ...events,
        [newEvent.id]: newEvent,
      };
      
      localStorage.setItem(EVENTS_KEY, JSON.stringify(updatedEvents));
      useEventStore.getState().addEvent(newEvent);
      
      useAnalytics.getState().addActivityLog({
        type: 'event_created',
        message: `New event "${newEvent.title}" created`,
        eventId: newEvent.id,
      });

      toast.success('Event created successfully!');
      return newEvent;
    } catch (error) {
      console.error('Error creating event:', error);
      toast.error('Failed to create event');
      throw error;
    }
  }

  static getEvents(): Record<string, Event> {
    try {
      const eventsJson = localStorage.getItem(EVENTS_KEY);
      const events = eventsJson ? JSON.parse(eventsJson) : {};
      useEventStore.getState().setEvents(events);
      return events;
    } catch (error) {
      console.error('Error getting events:', error);
      return {};
    }
  }

  static getEvent(id: string): Event | null {
    const events = this.getEvents();
    return events[id] || null;
  }

  static updateEvent(event: Event): void {
    try {
      const events = this.getEvents();
      const updatedEvent = {
        ...event,
        updatedAt: new Date().toISOString(),
      };
      
      events[event.id] = updatedEvent;
      localStorage.setItem(EVENTS_KEY, JSON.stringify(events));
      useEventStore.getState().updateEvent(updatedEvent);
      toast.success('Event updated successfully!');
    } catch (error) {
      console.error('Error updating event:', error);
      toast.error('Failed to update event');
      throw error;
    }
  }
}