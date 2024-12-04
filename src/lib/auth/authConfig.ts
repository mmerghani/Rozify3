export const authConfig = {
  domain: import.meta.env.VITE_AUTH0_DOMAIN || '',
  clientId: import.meta.env.VITE_AUTH0_CLIENT_ID || '',
  callbackUrl: import.meta.env.VITE_AUTH0_CALLBACK_URL || window.location.origin,
  audience: 'https://rozify.app/api',
  scope: 'openid profile email',
  roles: {
    admin: 'admin',
    user: 'user'
  }
};

export function validateAuthConfig() {
  if (!authConfig.domain || !authConfig.clientId) {
    console.error('Missing Auth0 configuration. Using development mode.');
    return false;
  }
  return true;
}

export function isAdmin(user: any): boolean {
  return process.env.NODE_ENV === 'development' || 
         user?.['https://rozify.app/roles']?.includes('admin');
}