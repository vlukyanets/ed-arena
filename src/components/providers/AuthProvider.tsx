'use client';

import { ReactNode } from 'react';
import { SessionProvider, useSession } from 'next-auth/react';

export default function AuthProvider({ children }: { children: ReactNode }) {
  return <SessionProvider>{children}</SessionProvider>;
}

export const useAuth = () => {
  const { data: session, status } = useSession();

  return {
    user: session?.user || null,
    loading: status === 'loading',
  };
};
