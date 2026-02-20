'use client';
import { Box, Typography, TextField, Button, Paper } from '@mui/material';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

interface TrainerInteractiveProps {
  title: string;
  type: 'text' | 'numpad' | 'singleChoice' | 'multipleChoice';
  onFinish?: (score: number) => void;
  isRoom?: boolean;
}

export default function TrainerInteractive({
  title,
  type,
  onFinish,
  isRoom,
}: TrainerInteractiveProps) {
  const { t } = useTranslation();
  const [answer, setAnswer] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onFinish) onFinish(100);
  };

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto', p: 3 }}>
      <Paper elevation={4} sx={{ p: 4, borderRadius: 4, textAlign: 'center' }}>
        <Typography variant="h4" fontWeight="bold" gutterBottom mb={4}>
          {title}
        </Typography>

        {isRoom && (
          <Typography variant="subtitle1" color="success.main" mb={3} fontWeight="bold">
            {t('trainer.roomActive', { defaultValue: '🟢 Room Active - Results will be recorded' })}
          </Typography>
        )}

        <Typography variant="h6" mb={4}>
          Question Placeholder
        </Typography>

        <form
          onSubmit={handleSubmit}
          style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}
        >
          {type === 'text' && (
            <TextField
              label={t('trainer.answerLabel', { defaultValue: 'Your Answer' })}
              variant="outlined"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              fullWidth
            />
          )}

          <Button
            type="submit"
            variant="contained"
            color="primary"
            size="large"
            sx={{ mt: 2, px: 6, py: 1.5, borderRadius: 3 }}
          >
            {t('trainer.submitBtn', { defaultValue: 'Submit Answer' })}
          </Button>
        </form>
      </Paper>
    </Box>
  );
}
