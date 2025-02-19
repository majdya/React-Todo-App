import { Todo } from "@/types/todo";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
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

const removeTodo = async (id: string) => {
  console.log("Remove:", id);
  let { data: todos, error } = await supabase
    .from("todos")
    .delete()
    .eq("id", id);

  if (error) throw new Error(error.message);

  return todos;
};

export const useRemoveTodoMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: removeTodo,
    onMutate: async (id) => {
      await queryClient.cancelQueries(["todos"]); // Cancel ongoing fetches to prevent race conditions

      const previousTodos = queryClient.getQueryData<Todo[]>(["todos"]); // Get current state

      queryClient.setQueryData(["todos"], (oldTodos: Todo[] = []) =>
        oldTodos.filter((todo) => todo.id !== id)
      );

      return { previousTodos }; // Save old state for rollback in case of failure
    },
    onError: (_error, _id, context) => {
      if (context?.previousTodos) {
        queryClient.setQueryData(["todos"], context.previousTodos); // Rollback UI on error
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries(["todos"]); // Ensure server state is in sync
    },
  });
};

const updateTodo = async (updatedTodo: Todo) => {
  let { data, error } = await supabase
    .from("todos")
    .update({
      title: updatedTodo.title,
      completed: updatedTodo.completed,
    })
    .eq("id", updatedTodo.id)
    .select();

  if (error) throw new Error(error.message);
  return data?.[0]; // Return the updated todo
};

export const useUpdateTodoMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateTodo,
    onMutate: async (updatedTodo) => {
      await queryClient.cancelQueries(["todos"]);

      const previousTodos = queryClient.getQueryData<Todo[]>(["todos"]);

      queryClient.setQueryData(["todos"], (oldTodos: Todo[] = []) =>
        oldTodos.map((todo) =>
          todo.id === updatedTodo.id ? { ...todo, ...updatedTodo } : todo
        )
      );

      return { previousTodos };
    },
    onError: (_error, _updatedTodo, context) => {
      if (context?.previousTodos) {
        queryClient.setQueryData(["todos"], context.previousTodos);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries(["todos"]);
    },
  });
};
