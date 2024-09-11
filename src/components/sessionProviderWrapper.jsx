// app/SessionProviderWrapper.js
'use client'; // This directive is necessary to mark this component as a client component
import { SessionProvider } from 'next-auth/react';

export default function SessionProviderWrapper({ children }) {
  return <SessionProvider>{children}</SessionProvider>;
}
