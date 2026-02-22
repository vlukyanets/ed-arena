'use client';
import { Box, Typography, Card, CardActionArea, CardContent, Grid, Button } from '@mui/material';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import { useAuth } from '@/components/providers/AuthProvider';
import BackButton from '@/components/BackButton';

const TRAINERS: Record<string, { id: string; titleKey: string; descKey: string }[]> = {
  math: [
    {
      id: 'addition',
      titleKey: 'trainers.math.addition.title',
      descKey: 'trainers.math.addition.desc',
    },
    {
      id: 'equations',
      titleKey: 'trainers.math.equations.title',
      descKey: 'trainers.math.equations.desc',
    },
  ],
  physics: [
    {
      id: 'kinematics',
      titleKey: 'trainers.physics.kinematics.title',
      descKey: 'trainers.physics.kinematics.desc',
    },
  ],
};

export default function SubjectTrainersPage() {
  const { SUBJECT_NAME } = useParams<{ SUBJECT_NAME: string }>();
  const searchParams = useSearchParams();
  const isSelfStudy = searchParams.get('mode') === 'self-study';
  const router = useRouter();
  const { t } = useTranslation();
  const { user } = useAuth();
  const trainers = TRAINERS[SUBJECT_NAME] || [];

  const handleCreateRoom = (trainerId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    router.push(`/subjects/${SUBJECT_NAME}/create-room/${trainerId}`);
  };

  const subjectTitle = t(`subjects.list.${SUBJECT_NAME}`, { defaultValue: SUBJECT_NAME });

  return (
    <Box sx={{ p: 4, maxWidth: '1200px', mx: 'auto' }}>
      <BackButton />
      <Typography variant="h4" gutterBottom fontWeight="bold">
        {subjectTitle} {t('subjects.trainersTitle', { defaultValue: 'Trainers' })}
      </Typography>

      {trainers.length === 0 ? (
        <Typography>
          {t('subjects.noTrainers', { defaultValue: 'No trainers found for this subject.' })}
        </Typography>
      ) : (
        <Grid container spacing={3}>
          {trainers.map((trainer) => (
            <Grid size={{ xs: 12, md: 6 }} key={trainer.id}>
              <Card
                elevation={3}
                sx={{
                  borderRadius: 3,
                  transition: '0.2s',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  '&:hover': { transform: 'translateY(-2px)' },
                }}
              >
                <CardActionArea
                  onClick={() => router.push(`/subjects/${SUBJECT_NAME}/${trainer.id}${isSelfStudy ? '?mode=self-study' : ''}`)}
                  sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}
                >
                  <CardContent sx={{ p: 3, flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                    <Typography variant="h5" fontWeight="bold" gutterBottom>
                      {t(trainer.titleKey, { defaultValue: trainer.id.toUpperCase() })}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2, flexGrow: 1 }}>
                      {t(trainer.descKey, { defaultValue: 'Practice your skills.' })}
                    </Typography>

                    {user && !isSelfStudy && (
                      <Button
                        variant="contained"
                        color="primary"
                        size="small"
                        onClick={(e) => handleCreateRoom(trainer.id, e)}
                        sx={{ mt: 2, alignSelf: 'flex-start' }}
                      >
                        {t('subjects.createRoomBtn', { defaultValue: 'Create Room' })}
                      </Button>
                    )}
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
}
