import { onAuthStateChanged, type User } from 'firebase/auth';
import { createContext, type PropsWithChildren, useContext, useEffect, useMemo, useState } from 'react';

import { auth, isFirebaseConfigured } from '@/lib/firebase';

type AuthContextValue = {
  isConfigured: boolean;
  isInitializing: boolean;
  user: User | null;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: PropsWithChildren) {
  const [user, setUser] = useState<User | null>(auth.currentUser);
  const [isInitializing, setIsInitializing] = useState(true);

  useEffect(() => onAuthStateChanged(auth, (nextUser) => {
    setUser(nextUser);
    setIsInitializing(false);
  }), []);

  const value = useMemo(() => ({
    isConfigured: isFirebaseConfigured,
    isInitializing,
    user,
  }), [isInitializing, user]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const value = useContext(AuthContext);
  if (!value) throw new Error('useAuth debe usarse dentro de AuthProvider.');
  return value;
}
