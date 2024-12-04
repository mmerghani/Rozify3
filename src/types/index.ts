export interface WishlistItem {
  id: string;
  name: string;
  description: string;
  price: number;
  url?: string;
  reserved?: boolean;
  reservedBy?: string;
}

export interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  description: string;
  host: string;
  location: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
  attachments?: {
    id: string;
    name: string;
    url: string;
    type: string;
  }[];
  wishlist: WishlistItem[];
  template?: string;
  createdBy?: string;
  createdAt: string;
  updatedAt: string;
}

export interface EventTemplate {
  id: string;
  translations: {
    en: {
      title: string;
      description: string;
    };
    ar: {
      title: string;
      description: string;
    };
  };
  icon: string;
  suggestedItems: {
    en: string[];
    ar: string[];
  };
}

export interface ActivityLog {
  id: string;
  type: 'event_created' | 'wishlist_updated' | 'user_joined' | 'item_reserved' | 'event_shared';
  message: string;
  userId?: string;
  eventId?: string;
  timestamp: string;
  metadata?: Record<string, any>;
}