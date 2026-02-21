'use client';
import { Button } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useRouter } from 'next/navigation';
import { useTranslation } from 'react-i18next';

export default function BackButton() {
  const router = useRouter();
  const { t } = useTranslation();

  return (
    <Button
      startIcon={<ArrowBackIcon />}
      onClick={() => router.back()}
      variant="text"
      color="inherit"
      sx={{
        mb: 2,
        opacity: 0.7,
        '&:hover': { opacity: 1 },
        textTransform: 'none',
        fontWeight: 500,
      }}
    >
      {t('general.back', { defaultValue: 'Back' })}
    </Button>
  );
}
