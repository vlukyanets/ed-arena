'use client';
import { Box, Typography, Button, Paper, Grid } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/components/providers/AuthProvider';
import { auth } from '@/lib/firebase';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

export default function Home() {
  const { t } = useTranslation();
  const router = useRouter();
  const { user, loading } = useAuth();

  const handleTeacherLogin = async () => {
    if (user) {
      router.push('/subjects');
      return;
    }
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      router.push('/subjects');
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

      <Grid container spacing={4} justifyContent="center" maxWidth="md">
        <Grid item xs={12} sm={4}>
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
              🏫 Teacher
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ mb: 3, flexGrow: 1, textAlign: 'center' }}
            >
              Create rooms, monitor student progress, and assign tests.
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
                : t('home.roleSelection.teacher', { defaultValue: 'Login as Teacher' })}
            </Button>
          </Paper>
        </Grid>

        <Grid item xs={12} sm={4}>
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
              🎓 Student
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ mb: 3, flexGrow: 1, textAlign: 'center' }}
            >
              Enter a class using a code provided by your teacher.
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

        <Grid item xs={12} sm={4}>
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
              📚 Self Study
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ mb: 3, flexGrow: 1, textAlign: 'center' }}
            >
              Practice independently without saving results.
            </Typography>
            <Button
              variant="outlined"
              color="primary"
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
