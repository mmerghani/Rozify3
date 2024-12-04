import { useState, useEffect } from 'react';
import { Event } from '../types';
import { EventService } from '../services/eventService';
import toast from 'react-hot-toast';

export function useEvents() {
  const [events, setEvents] = useState<Record<string, Event>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadEvents = () => {
      try {
        const loadedEvents = EventService.getEvents();
        setEvents(loadedEvents);
        setError(null);
      } catch (err) {
        setError('Failed to load events');
        toast.error('Failed to load events');
        console.error('Error loading events:', err);
      } finally {
        setLoading(false);
      }
    };

    loadEvents();
    window.addEventListener('storage', loadEvents);
    
    return () => {
      window.removeEventListener('storage', loadEvents);
    };
  }, []);

  const addEvent = async (eventData: Partial<Event>, userId: string) => {
    try {
      const newEvent = EventService.createEvent(eventData, userId);
      setEvents(prev => ({ ...prev, [newEvent.id]: newEvent }));
      return newEvent;
    } catch (error) {
      toast.error('Failed to create event');
      throw new Error('Failed to create event');
    }
  };

  const updateEvent = (event: Event) => {
    try {
      EventService.updateEvent(event);
      setEvents(prev => ({ ...prev, [event.id]: event }));
    } catch (error) {
      toast.error('Failed to update event');
      throw new Error('Failed to update event');
    }
  };

  return {
    events,
    loading,
    error,
    addEvent,
    updateEvent,
  };
}