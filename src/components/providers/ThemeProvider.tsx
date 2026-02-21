'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { ThemeProvider as MuiThemeProvider, createTheme, CssBaseline, Box } from '@mui/material';

type ThemeMode = 'light' | 'dark' | 'system';

interface ThemeContextType {
  mode: ThemeMode;
  setMode: (mode: ThemeMode) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function useThemeContext() {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useThemeContext must be used within ThemeProvider');
  return context;
}

export default function ThemeProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<ThemeMode>('system');
  const [systemIsDark, setSystemIsDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedMode = localStorage.getItem('themeMode') as ThemeMode | null;
    if (savedMode) setMode(savedMode);

    const matchMedia = window.matchMedia('(prefers-color-scheme: dark)');
    setSystemIsDark(matchMedia.matches);
    const listener = (e: MediaQueryListEvent) => setSystemIsDark(e.matches);
    matchMedia.addEventListener('change', listener);
    return () => matchMedia.removeEventListener('change', listener);
  }, []);

  const changeMode = (newMode: ThemeMode) => {
    setMode(newMode);
    localStorage.setItem('themeMode', newMode);
  };

  const isDarkMode = mode === 'dark' || (mode === 'system' && systemIsDark);

  const theme = createTheme({
    palette: {
      mode: isDarkMode ? 'dark' : 'light',
      primary: {
        main: '#3f51b5',
      },
      secondary: {
        main: '#f50057',
      },
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 8,
            textTransform: 'none',
          },
        },
      },
    },
  });

  if (!mounted) {
    return <div style={{ visibility: 'hidden' }} />;
  }

  return (
    <ThemeContext.Provider value={{ mode, setMode: changeMode }}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <Box
          sx={{
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            bgcolor: 'background.default',
          }}
        >
          {children}
        </Box>
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
}
