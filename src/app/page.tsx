'use client';
import { Box, Typography, Button, Paper, Grid } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/components/providers/AuthProvider';
import { signIn } from 'next-auth/react';

export default function Home() {
  const { t } = useTranslation();
  const router = useRouter();
  const { user, loading } = useAuth();

  const handleTeacherLogin = async () => {
    if (user) {
      router.push('/subjects');
      return;
    }
    try {
      await signIn('google', { redirectTo: '/subjects' });
    } catch (error) {
      console.error('Login failed', error);
    }
  };

  return (
    <Box sx={{ flexGrow: 1, p: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Typography
        variant="h3"
        component="h1"
        gutterBottom
        textAlign="center"
        sx={{ mb: 6, fontWeight: 'bold' }}
      >
        {t('home.roleSelection.title', { defaultValue: 'Welcome to Ed Arena' })}
      </Typography>

      <Grid container spacing={4} justifyContent="center" sx={{ maxWidth: 'md' }}>
        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <Paper
            elevation={3}
            sx={{
              p: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              height: '100%',
              borderRadius: 3,
            }}
          >
            <Typography variant="h5" gutterBottom textAlign="center" fontWeight="bold">
              {t('home.roleSelection.teacherTitle', { defaultValue: '🏫 Teacher' })}
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ mb: 3, flexGrow: 1, textAlign: 'center' }}
            >
              {t('home.roleSelection.teacherDesc', {
                defaultValue: 'Create rooms, monitor student progress, and assign tests.',
              })}
            </Typography>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={handleTeacherLogin}
              disabled={loading}
              sx={{ py: 1.5, borderRadius: 2 }}
            >
              {loading
                ? t('general.loading', { defaultValue: 'Loading...' })
                : user
                  ? t('home.roleSelection.teacherContinue', { defaultValue: 'Continue as Teacher' })
                  : t('home.roleSelection.teacher', { defaultValue: 'Login as Teacher' })}
            </Button>
          </Paper>
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <Paper
            elevation={3}
            sx={{
              p: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              height: '100%',
              borderRadius: 3,
            }}
          >
            <Typography variant="h5" gutterBottom textAlign="center" fontWeight="bold">
              {t('home.roleSelection.studentTitle', { defaultValue: '🎓 Student' })}
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ mb: 3, flexGrow: 1, textAlign: 'center' }}
            >
              {t('home.roleSelection.studentDesc', {
                defaultValue: 'Enter a class using a code provided by your teacher.',
              })}
            </Typography>
            <Button
              variant="contained"
              color="secondary"
              fullWidth
              onClick={() => router.push('/enter-class')}
              sx={{ py: 1.5, borderRadius: 2 }}
            >
              {t('home.roleSelection.studentRoom', { defaultValue: 'Enter Class via Code' })}
            </Button>
          </Paper>
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <Paper
            elevation={3}
            sx={{
              p: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              height: '100%',
              borderRadius: 3,
            }}
          >
            <Typography variant="h5" gutterBottom textAlign="center" fontWeight="bold">
              {t('home.roleSelection.selfStudyTitle', { defaultValue: '📚 Self Study' })}
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ mb: 3, flexGrow: 1, textAlign: 'center' }}
            >
              {t('home.roleSelection.selfStudyDesc', {
                defaultValue: 'Practice independently without saving results.',
              })}
            </Typography>
            <Button
              variant="contained"
              color="success"
              fullWidth
              onClick={() => router.push('/subjects')}
              sx={{ py: 1.5, borderRadius: 2 }}
            >
              {t('home.roleSelection.studentSelf', { defaultValue: 'Self Study' })}
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}
