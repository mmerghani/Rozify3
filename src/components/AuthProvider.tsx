import React from 'react';
import { Auth0Provider } from '@auth0/auth0-react';
import { authConfig } from '../lib/auth/authConfig';

interface AuthProviderProps {
  children: React.ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const isConfigValid = authConfig.domain && authConfig.clientId;

  // If config is invalid, render children without Auth0Provider in development
  if (!isConfigValid && process.env.NODE_ENV === 'development') {
    return <>{children}</>;
  }

  return (
    <Auth0Provider
      domain={authConfig.domain}
      clientId={authConfig.clientId}
      authorizationParams={{
        redirect_uri: window.location.origin,
        audience: authConfig.audience,
        scope: authConfig.scope,
      }}
      cacheLocation="localstorage"
    >
      {children}
    </Auth0Provider>
  );
}