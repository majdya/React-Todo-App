import { Todo } from "@/types/todo";
import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { getSupabaseClient, useAuthSession } from "@/lib/supabaseClient";

const supabase = getSupabaseClient();

// const fetchTodosPerUser = async (
//   user_id: string | undefined
// ): Promise<Todo[] | undefined> => {
//   if (!user_id) return undefined;

//   let { data: todos, error } = await supabase
//     .from("todos")
//     .select("*")
//     .eq("user_id", user_id);

//   if (error) throw new Error(error.message);
//   return todos || [];
// };

// export const useTodosQuery = () => {
//   const session = useAuthSession();
//   const user_id = session?.user.id;

//   return useQuery({
//     queryKey: ["todos", user_id],
//     queryFn: () => fetchTodosPerUser(user_id),
//     enabled: !!user_id,
//   });
// };

const fetchTodosPerUser = async ({
  user_id,
  pageParam = 0, // Default to the first page
}: {
  user_id: string;
  pageParam?: number;
}): Promise<{ data: Todo[]; nextPage: number | null }> => {
  if (!user_id) return { data: [], nextPage: null };

  const PAGE_SIZE = 10; // Number of todos per page

  const {
    data: todos,
    error,
    count,
  } = await supabase
    .from("todos")
    .select("*", { count: "exact" })
    .eq("user_id", user_id)
    .range(pageParam, pageParam + PAGE_SIZE - 1);

  if (error) {
    console.error("Error fetching todos:", error.message);
    return { data: [], nextPage: null };
  }

  // Determine if there are more pages
  const nextPage = todos.length < PAGE_SIZE ? null : pageParam + PAGE_SIZE;

  return { data: todos ?? [], nextPage };
};

export const useTodosInfiniteQuery = () => {
  const session = useAuthSession();
  const user_id = session?.user.id;

  return useInfiniteQuery({
    queryKey: ["todos", user_id],
    queryFn: ({ pageParam = 0 }) => fetchTodosPerUser({ user_id, pageParam }),
    enabled: Boolean(user_id),
    getNextPageParam: (lastPage) => lastPage.nextPage, // Get the next page index
    staleTime: 1000 * 60 * 5, // Cache results for 5 minutes
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

const removeTodo = async (id: string) => {
  console.log("Remove:", id);
  let { data: todos, error } = await supabase
    .from("todos")
    .delete()
    .eq("id", id);

  if (error) throw new Error(error.message);

  return todos;
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

export const useNewTodoMutation = () => {
  return useMutation({
    mutationFn: insertTodo,
  });
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
