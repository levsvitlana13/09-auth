

'use client';

import { useEffect } from 'react';

import { checkSession, getMe } from '@/lib/api/clientApi';
import { useAuthStore } from '@/lib/store/authStore';

interface AuthProviderProps {
  children: React.ReactNode;
}

export default function AuthProvider({
  children,
}: AuthProviderProps) {
  useEffect(() => {
    const initAuth = async () => {
      const {
        setUser,
        clearIsAuthenticated,
      } = useAuthStore.getState();

      try {
        const session = await checkSession();

        if (!session) {
          clearIsAuthenticated();
          return;
        }

        const user = await getMe();

        setUser(user);
      } catch {
        clearIsAuthenticated();
      }
    };

    initAuth();
  }, []);

  return <>{children}</>;
}