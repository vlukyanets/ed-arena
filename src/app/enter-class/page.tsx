'use client';
import { Box, Typography, TextField, Button, Paper } from '@mui/material';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslation } from 'react-i18next';

export default function EnterClassPage() {
  const [code, setCode] = useState('');
  const [nickname, setNickname] = useState('');
  const router = useRouter();
  const { t } = useTranslation();

  const handleJoin = (e: React.FormEvent) => {
    e.preventDefault();
    if (code.trim() && nickname.trim()) {
      router.push(`/class/${code.trim()}`);
    }
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
      <Paper elevation={3} sx={{ p: 5, borderRadius: 3, maxWidth: 400, width: '100%' }}>
        <Typography
          variant="h5"
          component="h1"
          gutterBottom
          textAlign="center"
          fontWeight="bold"
          sx={{ mb: 4 }}
        >
          {t('enterClass.title', { defaultValue: 'Join a Class' })}
        </Typography>

        <form onSubmit={handleJoin}>
          <TextField
            fullWidth
            label={t('enterClass.codeLabel', { defaultValue: 'Room Code' })}
            variant="outlined"
            margin="normal"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            required
          />
          <TextField
            fullWidth
            label={t('enterClass.nicknameLabel', { defaultValue: 'Your Nickname' })}
            variant="outlined"
            margin="normal"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            required
            sx={{ mb: 4 }}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            size="large"
            sx={{ py: 1.5, borderRadius: 2 }}
          >
            {t('enterClass.joinButton', { defaultValue: 'Join Room' })}
          </Button>
        </form>
      </Paper>
    </Box>
  );
}
