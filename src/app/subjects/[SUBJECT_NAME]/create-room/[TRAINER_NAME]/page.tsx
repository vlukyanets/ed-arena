'use client';
import { Box, Typography, Button, Paper, FormControlLabel, Checkbox } from '@mui/material';
import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import { useAuth } from '@/components/providers/AuthProvider';

export default function CreateRoomPage() {
  const { SUBJECT_NAME, TRAINER_NAME } = useParams<{
    SUBJECT_NAME: string;
    TRAINER_NAME: string;
  }>();
  const [saveResults, setSaveResults] = useState(false);
  const router = useRouter();
  const { t } = useTranslation();
  const { user, loading } = useAuth();

  if (loading) return null;
  if (!user) {
    router.push('/');
    return null;
  }

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    const newCode = Math.random().toString(36).substring(2, 8).toUpperCase();
    router.push(`/class/${newCode}`);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '80vh',
        p: 3,
      }}
    >
      <Paper elevation={3} sx={{ p: 5, borderRadius: 3, maxWidth: 500, width: '100%' }}>
        <Typography
          variant="h5"
          component="h1"
          gutterBottom
          textAlign="center"
          fontWeight="bold"
          sx={{ mb: 4 }}
        >
          {t('createRoom.title', { defaultValue: 'Create New Room' })}
        </Typography>

        <Typography
          variant="subtitle1"
          gutterBottom
          textAlign="center"
          color="text.secondary"
          sx={{ mb: 4 }}
        >
          {SUBJECT_NAME} / {TRAINER_NAME}
        </Typography>

        <form onSubmit={handleCreate}>
          <FormControlLabel
            control={
              <Checkbox
                checked={saveResults}
                onChange={(e) => setSaveResults(e.target.checked)}
                color="primary"
              />
            }
            label={t('createRoom.saveResultsLabel', {
              defaultValue: 'Save student results to database',
            })}
            sx={{ mb: 4, display: 'block', textAlign: 'center' }}
          />
          <Button
            type="submit"
            variant="contained"
            color="secondary"
            fullWidth
            size="large"
            sx={{ py: 1.5, borderRadius: 2 }}
          >
            {t('createRoom.createBtn', { defaultValue: 'Generate Room Code' })}
          </Button>
        </form>
      </Paper>
    </Box>
  );
}
