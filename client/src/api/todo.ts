import { Todo } from "@/types/todo";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getSupabaseClient, useAuthSession } from "@/lib/supabaseClient";

const supabase = getSupabaseClient();

const fetchTodosPerUser = async (
  user_id: string | undefined
): Promise<Todo[] | undefined> => {
  if (!user_id) return undefined;

  let { data: todos, error } = await supabase
    .from("todos")
    .select("*")
    .eq("user_id", user_id);

  if (error) throw new Error(error.message);
  return todos || [];
};

export const useTodos = () => {
  const session = useAuthSession();
  const user_id = session?.user.id;

  return useQuery({
    queryKey: ["todos", user_id],
    queryFn: () => fetchTodosPerUser(user_id),
    enabled: !!user_id,
  });
};

const insertTodo = async (todo: Todo) => {
  let { data: todos, error } = await supabase
    .from("todos")
    .insert([{ ...todo }])
    .select();

  if (error) throw new Error(error.message);

  return todos;
};

export const useNewTodoMutation = () => {
  return useMutation({
    mutationFn: insertTodo,
  });
};
