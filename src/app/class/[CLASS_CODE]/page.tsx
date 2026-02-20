'use client';
import { useParams } from 'next/navigation';
import TrainerInteractive from '@/components/TrainerInteractive';

export default function RoomPage() {
  const { CLASS_CODE } = useParams<{ CLASS_CODE: string }>();

  return <TrainerInteractive title={`Room: ${CLASS_CODE}`} type="text" isRoom={true} />;
}
