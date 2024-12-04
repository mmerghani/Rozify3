import { create } from 'zustand';
import { Event } from '../../types';

interface EventStore {
  events: Record<string, Event>;
  setEvents: (events: Record<string, Event>) => void;
  addEvent: (event: Event) => void;
  updateEvent: (event: Event) => void;
}

export const useEventStore = create<EventStore>((set) => ({
  events: {},
  setEvents: (events) => set({ events }),
  addEvent: (event) => set((state) => ({
    events: { ...state.events, [event.id]: event }
  })),
  updateEvent: (event) => set((state) => ({
    events: { ...state.events, [event.id]: event }
  }))
}));