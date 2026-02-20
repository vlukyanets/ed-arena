'use client';
import { AppBar, Toolbar, Typography, Menu, MenuItem, IconButton, Box } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useThemeContext } from './providers/ThemeProvider';
import { useState, MouseEvent } from 'react';
import LanguageIcon from '@mui/icons-material/Language';
import Brightness4Icon from '@mui/icons-material/Brightness4';

export default function Navbar() {
  const { t, i18n } = useTranslation();
  const { mode, setMode } = useThemeContext();

  const [langAnchorEl, setLangAnchorEl] = useState<null | HTMLElement>(null);
  const [themeAnchorEl, setThemeAnchorEl] = useState<null | HTMLElement>(null);

  const handleLangMenuOpen = (event: MouseEvent<HTMLElement>) => {
    setLangAnchorEl(event.currentTarget);
  };
  const handleLangMenuClose = () => setLangAnchorEl(null);

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    handleLangMenuClose();
  };

  const handleThemeMenuOpen = (event: MouseEvent<HTMLElement>) => {
    setThemeAnchorEl(event.currentTarget);
  };
  const handleThemeMenuClose = () => setThemeAnchorEl(null);

  const changeTheme = (newMode: 'light' | 'dark' | 'system') => {
    setMode(newMode);
    handleThemeMenuClose();
  };

  return (
    <AppBar position="static" color="inherit" elevation={1}>
      <Toolbar>
        <Typography
          variant="h5"
          component="div"
          sx={{ flexGrow: 1, fontWeight: 'bold', color: 'primary.main' }}
        >
          Ed Arena
        </Typography>

        <Box sx={{ display: 'flex', gap: 1 }}>
          <IconButton color="inherit" onClick={handleLangMenuOpen}>
            <LanguageIcon />
          </IconButton>
          <Menu anchorEl={langAnchorEl} open={Boolean(langAnchorEl)} onClose={handleLangMenuClose}>
            <MenuItem onClick={() => changeLanguage('en')}>
              {t('nav.language.en', { defaultValue: 'English' })}
            </MenuItem>
            <MenuItem onClick={() => changeLanguage('uk')}>
              {t('nav.language.uk', { defaultValue: 'Ukrainian' })}
            </MenuItem>
          </Menu>

          <IconButton color="inherit" onClick={handleThemeMenuOpen}>
            <Brightness4Icon />
          </IconButton>
          <Menu
            anchorEl={themeAnchorEl}
            open={Boolean(themeAnchorEl)}
            onClose={handleThemeMenuClose}
          >
            <MenuItem onClick={() => changeTheme('light')}>
              {t('nav.theme.light', { defaultValue: 'Light' })}
            </MenuItem>
            <MenuItem onClick={() => changeTheme('dark')}>
              {t('nav.theme.dark', { defaultValue: 'Dark' })}
            </MenuItem>
            <MenuItem onClick={() => changeTheme('system')}>
              {t('nav.theme.system', { defaultValue: 'System' })}
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
