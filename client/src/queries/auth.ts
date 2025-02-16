import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || "";
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || "";

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export async function signUp(email: string, password: string) {
  try {
    const { data, error } = await supabase.auth.signUp({ email, password });
    if (error) {
      console.error("Sign up error:", error);
      return { success: false, error: error.message };
    } else {
      console.log("Sign up successful:", data);
      return { success: true, user: data.user };
    }
  } catch (err) {
    console.error("Sign up error (catch):", err);
    return { success: false, error: "An unexpected error occurred." };
  }
}
