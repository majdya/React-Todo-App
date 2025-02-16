import { useState, useMemo } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getTodos } from "@/queries/todosQueries";
import { Todo, TodoCardProps } from "@/types/todo";
import TodoCard from "./TodoCard";
import AddTodo from "./AddTodo";
import SearchTodo from "./SearchTodo";

const TodoList = () => {
  const queryClient = useQueryClient();

  const { data: todos = [], isLoading } = useQuery({
    queryKey: ["todos"],
    queryFn: getTodos,
  });

  const [searchTerm, setSearchTerm] = useState("");

  const filteredTodos = useMemo(
    () =>
      todos.filter((todo: Todo) =>
        todo.title.toLowerCase().includes(searchTerm.toLowerCase())
      ),
    [todos, searchTerm]
  );

  const toggleTodoMutation = useMutation({
    mutationFn: async (id: string) => {
      return id;
    },
    onSuccess: (id) => {
      queryClient.setQueryData(["todos"], (oldTodos: Todo[] = []) =>
        oldTodos.map((todo) =>
          todo.id === id ? { ...todo, completed: !todo.completed } : todo
        )
      );
    },
  });

  const removeTodoMutation = useMutation({
    mutationFn: async (id: string) => {
      //Replace with api
      return id;
    },
    onSuccess: (id) => {
      queryClient.setQueryData(["todos"], (oldTodos: Todo[] = []) =>
        oldTodos.filter((todo) => todo.id !== id)
      );
    },
  });

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="container mx-auto max-w-[90%] lg:max-w-[50%] mt-6 p-4 lg:p-8 rounded-3xl bg-gray-200">
      <AddTodo />
      <SearchTodo onSearch={setSearchTerm} />

      <div className="grid grid-cols-1 mt-4">
        {filteredTodos.map((todo: TodoCardProps) => (
          <TodoCard
            key={todo.id}
            {...todo}
            onClick={() => toggleTodoMutation.mutate(todo.id)}
            onRemove={() => removeTodoMutation.mutate(todo.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default TodoList;
