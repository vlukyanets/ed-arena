'use client';
import { Box, Typography, Grid, Card, CardContent, CardActionArea } from '@mui/material';
import { useRouter } from 'next/navigation';
import { useTranslation } from 'react-i18next';

const SUBJECTS = [
  { id: 'math', icon: '📐', translationKey: 'subjects.list.math' },
  { id: 'physics', icon: '⚡', translationKey: 'subjects.list.physics' },
  { id: 'history', icon: '🌍', translationKey: 'subjects.list.history' },
];

export default function SubjectsPage() {
  const router = useRouter();
  const { t } = useTranslation();

  return (
    <Box sx={{ p: 4, maxWidth: '1200px', mx: 'auto' }}>
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
                '&:hover': { transform: 'translateY(-4px)', boxShadow: 6 },
              }}
            >
              <CardActionArea onClick={() => router.push(`/subjects/${subject.id}`)}>
                <CardContent
                  sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', p: 4 }}
                >
                  <Typography variant="h1" sx={{ mb: 2 }}>
                    {subject.icon}
                  </Typography>
                  <Typography variant="h6" fontWeight="bold">
                    {t(subject.translationKey, {
                      defaultValue: subject.id.charAt(0).toUpperCase() + subject.id.slice(1),
                    })}
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
