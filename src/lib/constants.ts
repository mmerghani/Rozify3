export const APP_NAME = 'Rozify';
export const LOCAL_STORAGE_KEYS = {
  EVENTS: 'rozify_events',
  USER: 'rozify_user',
  ANALYTICS: 'rozify_analytics'
} as const;

export const ROUTES = {
  HOME: '/',
  CREATE_EVENT: '/create-event',
  EVENT: '/event',
  ADMIN: '/admin'
} as const;