'use client';
import { ReactNode } from 'react';
import ThemeProvider from './ThemeProvider';
import TranslationProvider from './TranslationProvider';
import AuthProvider from './AuthProvider';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';

export default function AppProviders({ children }: { children: ReactNode }) {
  return (
    <AppRouterCacheProvider>
      <TranslationProvider>
        <AuthProvider>
          <ThemeProvider>{children}</ThemeProvider>
        </AuthProvider>
      </TranslationProvider>
    </AppRouterCacheProvider>
  );
}
