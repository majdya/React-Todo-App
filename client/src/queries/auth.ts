import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || "";
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || "";

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const signUp = async (email: string, password: string) => {
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
};

export const signIn = async (email: string, password: string) => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      console.error("Sign in error:", error);
      return { success: false, error: error.message };
    } else {
      console.log("Sign in successful:", data);
      return { success: true, session: data.session, user: data.user };
    }
  } catch (err) {
    console.error("Sign in error (catch):", err);
    return { success: false, error: "An unexpected error occurred." };
  }
};

export async function fetchUserProfile(userId: string) {
  try {
    const { data, error } = await supabase
      .from("Profiles") // Replace 'profiles' with your table name
      .select("*")
      .eq("id", userId);

    if (error) {
      console.error("Error fetching profile:", error);
      return { success: false, error: error.message };
    } else {
      return { success: true, profile: data ? data[0] : null }; // Assuming one profile per user
    }
  } catch (error) {
    console.error("Error fetching profile (catch):", error);
    return { success: false, error: "An unexpected error occurred." };
  }
}
