import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import { supabaseClient } from './supabaseClient';

// FIX: Define a type for the Auth context value. This will provide type safety for components that use the `useAuth` hook.
interface AuthContextType {
  session: any;
  user: any;
  signUp: (data: any) => Promise<any>;
  signIn: (data: any) => Promise<any>;
  signOut: () => Promise<any>;
}

// FIX: Create the context with the defined type and an empty object cast as the type for a default value.
// This prevents TypeScript errors in consumer components without needing to check for an undefined context.
const AuthContext = createContext({} as AuthContextType);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [session, setSession] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getSession = async () => {
        const { data } = await supabaseClient.auth.getSession();
        setSession(data.session);
        setUser(data.session?.user ?? null);
        setLoading(false);
    }
    
    getSession();

    const { data: authListener } = supabaseClient.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
      }
    );

    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, []);

  const value = {
    session,
    user,
    signUp: (data: any) => supabaseClient.auth.signUp(data),
    signIn: (data: any) => supabaseClient.auth.signInWithPassword(data),
    signOut: () => supabaseClient.auth.signOut(),
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
