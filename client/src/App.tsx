"use client";

import TodoList from "./components/views/TodoList";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const queryClient = new QueryClient();
import "./App.css";
import { useEffect, useState } from "react";

import { createClient, Session } from "@supabase/supabase-js";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || "";
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || "";

const supabase = createClient(supabaseUrl, supabaseAnonKey);

const App = () => {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session: Session | null) => {
      setSession(session); // Explicitly specifying session type
    });

    return () => subscription.unsubscribe();
  }, []);

  if (!session)
    return (
      <div
        className={`flex justify-center 
            min-h-lvh pt-5 bg-gradient-to-tr top-0 z-1 sticky
           from-zinc-400 via-indigo-800 to-slate-700`}
      >
        <Auth supabaseClient={supabase} appearance={{ theme: ThemeSupa }} />
      </div>
    );

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <div
          className={`min-h-lvh pt-5 bg-gradient-to-tr top-0 z-1 sticky
                    from-zinc-200 via-indigo-500 to-slate-500`}
        >
          <TodoList />
        </div>
      </QueryClientProvider>
    </>
  );
};

export default App;
