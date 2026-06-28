'use client';
import React from 'react';
import ReactQueryProvider from './providers/reaqt-query-provider';
import { TanStackDevtools } from '@tanstack/react-devtools';
import { ThemeProvider } from './providers/theme-provider';

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    // ReactQueryProvider
    <ReactQueryProvider>
      {/* <ReactQueryDevtools */}
      {process.env.NODE_ENV === 'development' && (
        <TanStackDevtools config={{ defaultOpen: false }} />
      )}

      {/* ThemeProvider */}
      <ThemeProvider>{children}</ThemeProvider>
    </ReactQueryProvider>
  );
}
