import React, { createContext, useContext, useEffect, useState } from 'react';
import type { User as SupabaseUser, Session } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';

// Profile shape stored in Supabase user_metadata (set during signup)
export interface UserProfile {
  id: string;
  email: string;
  full_name: string;
  role: 'student' | 'recruiter' | 'admin';
  college?: string;
  department?: string;
  graduation_year?: string;
  avatar_url?: string;
}

type AuthContextType = {
  user: SupabaseUser | null;
  profile: UserProfile | null;
  session: Session | null;
  loading: boolean;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  profile: null,
  session: null,
  loading: true,
  signOut: async () => {},
});

function buildProfile(user: SupabaseUser): UserProfile {
  const meta = user.user_metadata ?? {};
  return {
    id: user.id,
    email: user.email ?? '',
    full_name: meta.full_name ?? user.email?.split('@')[0] ?? 'User',
    role: (meta.role as UserProfile['role']) ?? 'student',
    college: meta.college,
    department: meta.department,
    graduation_year: meta.graduation_year,
    avatar_url: meta.avatar_url,
  };
}

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      const u = session?.user ?? null;
      setUser(u);
      setProfile(u ? buildProfile(u) : null);
      setLoading(false);
    });

    // Listen for auth state changes (login, logout, token refresh)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      const u = session?.user ?? null;
      setUser(u);
      setProfile(u ? buildProfile(u) : null);
      setLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  return (
    <AuthContext.Provider value={{ user, profile, session, loading, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
