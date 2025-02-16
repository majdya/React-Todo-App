import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Todo } from "@/types/todo";

// Mock API functions (replace with real API calls)
const toggleTodoAPI = async (id: string) => id;
const updateTodoTitleAPI = async ({
  id,
  newTitle,
}: {
  id: string;
  newTitle: string;
}) => {
  return { id, newTitle };
};
const removeTodoAPI = async (id: string) => id;

export const useToggleTodoMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: toggleTodoAPI,
    onSuccess: (id) => {
      queryClient.setQueryData(["todos"], (oldTodos: Todo[] = []) =>
        oldTodos.map((todo) =>
          todo.id === id ? { ...todo, completed: !todo.completed } : todo
        )
      );
    },
  });
};

export const useUpdateTitleMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateTodoTitleAPI,
    onSuccess: ({ id, newTitle }) => {
      queryClient.setQueryData(["todos"], (oldTodos: Todo[] = []) =>
        oldTodos.map((todo) => {
          return todo.id === id ? { ...todo, title: newTitle } : todo;
        })
      );
    },
  });
};

export const useRemoveTodoMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: removeTodoAPI,
    onSuccess: (id) => {
      queryClient.setQueryData(["todos"], (oldTodos: Todo[] = []) =>
        oldTodos.filter((todo) => todo.id !== id)
      );
    },
  });
};
