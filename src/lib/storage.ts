import { Event, WishlistItem } from '../types';

const EVENTS_KEY = 'rozify_events';
const USER_KEY = 'rozify_user';

export function saveEvent(event: Event): void {
  const events = getEvents();
  const updatedEvents = {
    ...events,
    [event.id]: {
      ...event,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
  };
  localStorage.setItem(EVENTS_KEY, JSON.stringify(updatedEvents));
}

export function getEvent(id: string): Event | null {
  const events = getEvents();
  return events[id] || null;
}

export function getEvents(): Record<string, Event> {
  try {
    const eventsJson = localStorage.getItem(EVENTS_KEY);
    return eventsJson ? JSON.parse(eventsJson) : {};
  } catch (error) {
    console.error('Error parsing events:', error);
    return {};
  }
}

export function updateWishlistItem(eventId: string, item: WishlistItem): void {
  const event = getEvent(eventId);
  if (!event) return;

  const itemIndex = event.wishlist.findIndex((i) => i.id === item.id);
  if (itemIndex >= 0) {
    event.wishlist[itemIndex] = item;
  } else {
    event.wishlist.push(item);
  }

  saveEvent(event);
}

export function saveUserName(name: string): void {
  localStorage.setItem(USER_KEY, name);
}

export function getUserName(): string | null {
  return localStorage.getItem(USER_KEY);
}