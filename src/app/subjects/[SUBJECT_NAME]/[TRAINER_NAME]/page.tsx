'use client';
import { useParams, useSearchParams } from 'next/navigation';
import TrainerInteractive from '@/components/TrainerInteractive';

export default function IndependentTrainerPage() {
  const { SUBJECT_NAME, TRAINER_NAME } = useParams<{
    SUBJECT_NAME: string;
    TRAINER_NAME: string;
  }>();
  const searchParams = useSearchParams();
  const isSelfStudy = searchParams.get('mode') === 'self-study';

  return (
    <TrainerInteractive
      subjectName={SUBJECT_NAME}
      trainerName={TRAINER_NAME}
      type="text"
      isRoom={false}
      hasCreateRoomButton={!isSelfStudy}
    />
  );
}
