import { useEffect, useState } from "react";
import { createClient, Session, SupabaseClient } from "@supabase/supabase-js";

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || "";
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || "";

let supabase: SupabaseClient | null = null;

export const getSupabaseClient = (): SupabaseClient => {
  if (!supabase) {
    supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
  }
  return supabase;
};

export const useAuthSession = () => {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    // Fetch initial session
    supabase!.auth.getSession().then(({ data }) => {
      setSession(data?.session ?? null);
    });

    // Listen for auth state changes
    const { data: listener } = supabase!.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
      }
    );

    return () => listener?.subscription?.unsubscribe();
  }, []);

  return session;
};
