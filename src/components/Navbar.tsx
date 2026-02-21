'use client';
import {
  AppBar,
  Toolbar,
  Typography,
  Menu,
  MenuItem,
  IconButton,
  Box,
  Avatar,
  Tooltip,
  Divider,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useThemeContext } from './providers/ThemeProvider';
import { useState, MouseEvent } from 'react';
import { useAuth } from './providers/AuthProvider';
import { signIn, signOut } from 'next-auth/react';
import Link from 'next/link';

type ThemeMode = 'light' | 'dark' | 'system';

const LANG_FLAGS: Record<string, string> = {
  en: '🇬🇧',
  uk: '🇺🇦',
};

const THEME_ICONS: Record<ThemeMode, string> = {
  light: '☀️',
  dark: '🌙',
  system: '💻',
};

export default function Navbar() {
  const { t, i18n } = useTranslation();
  const { mode, setMode, resolvedMode } = useThemeContext();
  const { user } = useAuth();

  const [langAnchorEl, setLangAnchorEl] = useState<null | HTMLElement>(null);
  const [themeAnchorEl, setThemeAnchorEl] = useState<null | HTMLElement>(null);
  const [userAnchorEl, setUserAnchorEl] = useState<null | HTMLElement>(null);

  const handleLangMenuOpen = (e: MouseEvent<HTMLElement>) => setLangAnchorEl(e.currentTarget);
  const handleLangMenuClose = () => setLangAnchorEl(null);
  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    handleLangMenuClose();
  };

  const handleThemeMenuOpen = (e: MouseEvent<HTMLElement>) => setThemeAnchorEl(e.currentTarget);
  const handleThemeMenuClose = () => setThemeAnchorEl(null);
  const changeTheme = (newMode: ThemeMode) => {
    setMode(newMode);
    handleThemeMenuClose();
  };

  const handleUserMenuOpen = (e: MouseEvent<HTMLElement>) => setUserAnchorEl(e.currentTarget);
  const handleUserMenuClose = () => setUserAnchorEl(null);

  // Language: flag emoji from map, name from i18n
  const langCode = LANG_FLAGS[i18n.language] ? i18n.language : i18n.language?.split('-')[0];
  const currentFlag = LANG_FLAGS[langCode] ?? '🌐';

  // Theme: show actual resolved icon (system resolves to light/dark)
  const effectiveTheme = mode === 'system' ? resolvedMode : mode;
  const themeIcon = THEME_ICONS[effectiveTheme] ?? THEME_ICONS[mode] ?? '💻';

  return (
    <AppBar position="static" color="inherit" elevation={1}>
      <Toolbar>
        {/* Ed Arena → root link */}
        <Typography
          variant="h5"
          component={Link}
          href="/"
          sx={{
            flexGrow: 1,
            fontWeight: 'bold',
            color: 'primary.main',
            textDecoration: 'none',
            '&:hover': { opacity: 0.8 },
          }}
        >
          Ed Arena
        </Typography>

        <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
          {/* Language — flag of current language */}
          <IconButton
            color="inherit"
            onClick={handleLangMenuOpen}
            sx={{ fontSize: '1.3rem', width: 40, height: 40 }}
          >
            {currentFlag}
          </IconButton>
          <Menu anchorEl={langAnchorEl} open={Boolean(langAnchorEl)} onClose={handleLangMenuClose}>
            {Object.entries(LANG_FLAGS).map(([code, flag]) => (
              <MenuItem key={code} onClick={() => changeLanguage(code)}>
                {flag} {t(`nav.language.${code}`, { defaultValue: code.toUpperCase() })}
              </MenuItem>
            ))}
          </Menu>

          {/* Theme — actual resolved icon */}
          <IconButton
            color="inherit"
            onClick={handleThemeMenuOpen}
            sx={{ fontSize: '1.3rem', width: 40, height: 40 }}
          >
            {themeIcon}
          </IconButton>
          <Menu
            anchorEl={themeAnchorEl}
            open={Boolean(themeAnchorEl)}
            onClose={handleThemeMenuClose}
          >
            {(Object.entries(THEME_ICONS) as [ThemeMode, string][]).map(
              ([key, icon]) => (
                <MenuItem key={key} onClick={() => changeTheme(key)}>
                  {icon} {t(`nav.theme.${key}`, { defaultValue: key })}
                </MenuItem>
              ),
            )}
          </Menu>

          {/* User avatar when logged in, or nothing */}
          {user ? (
            <>
              <Tooltip title={user.name ?? user.email ?? ''}>
                <IconButton onClick={handleUserMenuOpen} sx={{ p: 0 }}>
                  <Avatar
                    src={user.image ?? undefined}
                    alt={user.name ?? 'Teacher'}
                    sx={{ width: 34, height: 34 }}
                  />
                </IconButton>
              </Tooltip>
              <Menu
                anchorEl={userAnchorEl}
                open={Boolean(userAnchorEl)}
                onClose={handleUserMenuClose}
              >
                <MenuItem disabled sx={{ opacity: 1, fontWeight: 'bold' }}>
                  {user.name ?? user.email}
                </MenuItem>
                <Divider />
                <MenuItem
                  onClick={() => {
                    handleUserMenuClose();
                    signOut({ redirectTo: '/' });
                  }}
                >
                  {t('nav.signOut', { defaultValue: '🚪 Sign Out' })}
                </MenuItem>
              </Menu>
            </>
          ) : (
            <>
              <Tooltip title={t('nav.signIn', { defaultValue: 'Sign in as Teacher' })}>
                <IconButton
                  color="inherit"
                  onClick={async () => {
                    try {
                      await signIn('google', { redirectTo: '/subjects' });
                    } catch (error) {
                      console.error('Login failed', error);
                    }
                  }}
                  sx={{ fontSize: '1.3rem', width: 40, height: 40 }}
                >
                  👤
                </IconButton>
              </Tooltip>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}
