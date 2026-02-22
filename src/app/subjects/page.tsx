'use client';
import { Box, Typography, Grid, Card, CardContent, CardActionArea } from '@mui/material';
import { useRouter, useSearchParams } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import BackButton from '@/components/BackButton';

const SUBJECTS = [
  { id: 'math', icon: '📐' },
  { id: 'physics', icon: '⚡' },
  { id: 'history', icon: '🌍' },
];

export default function SubjectsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { t } = useTranslation();
  const mode = searchParams.get('mode');
  const queryString = mode ? `?mode=${mode}` : '';

  return (
    <Box sx={{ p: 4, maxWidth: '1200px', mx: 'auto' }}>
      <BackButton />
      <Typography variant="h4" component="h1" gutterBottom fontWeight="bold" sx={{ mb: 4 }}>
        {t('subjects.title', { defaultValue: 'Select a Subject' })}
      </Typography>

      <Grid container spacing={3}>
        {SUBJECTS.map((subject) => (
          <Grid size={{ xs: 12, sm: 6, md: 4 }} key={subject.id}>
            <Card
              elevation={2}
              sx={{
                borderRadius: 3,
                transition: '0.2s',
                height: '100%',
                '&:hover': { transform: 'translateY(-4px)', boxShadow: 6 },
              }}
            >
              <CardActionArea
                onClick={() => router.push(`/subjects/${subject.id}${queryString}`)}
                sx={{ height: '100%' }}
              >
                <CardContent
                  sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', p: 4 }}
                >
                  <Typography variant="h1" sx={{ mb: 2 }}>
                    {subject.icon}
                  </Typography>
                  <Typography variant="h6" fontWeight="bold" gutterBottom>
                    {t(`subjects.list.${subject.id}`, {
                      defaultValue: subject.id.charAt(0).toUpperCase() + subject.id.slice(1),
                    })}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" textAlign="center">
                    {t(`subjects.desc.${subject.id}`, { defaultValue: '' })}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
