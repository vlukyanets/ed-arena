'use client';
import { useParams } from 'next/navigation';
import TrainerInteractive from '@/components/TrainerInteractive';

export default function IndependentTrainerPage() {
  const { SUBJECT_NAME, TRAINER_NAME } = useParams<{
    SUBJECT_NAME: string;
    TRAINER_NAME: string;
  }>();

  return (
    <TrainerInteractive
      subjectName={SUBJECT_NAME}
      trainerName={TRAINER_NAME}
      type="text"
      isRoom={false}
    />
  );
}
