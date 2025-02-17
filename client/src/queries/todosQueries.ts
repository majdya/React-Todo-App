import { createClient } from "@supabase/supabase-js";
import { useQuery } from "@tanstack/react-query";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || "";
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || "";

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const getTodos = async () => {
  const response = await fetch("https://jsonplaceholder.typicode.com/todos");
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(
      `HTTP error! status: ${response.status}, message: ${errorText}`
    );
  }
  return response.json();
};

const fetchTodos = async () => {
  let { data: todos, error } = await supabase.from("todos").select("*");
  if (error) throw new Error(error.message);
  console.log(todos);
  return todos;
};

export const useTodos = (tmp?: boolean) => {
  if (tmp) {
    return useQuery({
      queryKey: ["todos"],
      queryFn: getTodos,
    });
  }
  return useQuery({
    queryKey: ["todos"],
    queryFn: fetchTodos,
  });
};
