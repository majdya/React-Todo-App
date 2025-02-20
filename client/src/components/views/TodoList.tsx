import { useState, useMemo, useEffect } from "react";
import {
  useTodosInfiniteQuery,
  useRemoveTodoMutation,
  useUpdateTodoMutation,
} from "@/api/todo";
import { Todo } from "@/types/todo";
import TodoCard from "./TodoCard";
import AddTodo from "./AddTodo";
import SearchTodo from "./SearchTodo";
import { useInView } from "react-intersection-observer";

const TodoList = () => {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    error,
  } = useTodosInfiniteQuery();

  const { mutate: removeTodo } = useRemoveTodoMutation();
  const { mutate: updateTodo } = useUpdateTodoMutation();
  const [searchTerm, setSearchTerm] = useState("");

  // Infinite scroll trigger
  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  // Flatten paginated data, but only show fetched items
  const todos = useMemo(
    () => data?.pages.flatMap((page) => page.data) || [],
    [data]
  );

  const filteredTodos = useMemo(() => {
    return todos
      .filter((todo: Todo) =>
        todo.title.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .sort((a, b) => Number(a.completed) - Number(b.completed)); // Sort: Incomplete first
  }, [todos, searchTerm]);

  if (error) return <div className="text-red-500">Error: {error.message}</div>;
  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="container mx-auto max-w-[90%] lg:max-w-[50%] mt-6 p-4 lg:p-8 rounded-3xl bg-zinc-300">
      <AddTodo />
      <SearchTodo onSearch={setSearchTerm} />

      <div className="grid grid-cols-1 mt-4">
        {filteredTodos.length > 0 ? (
          filteredTodos.map((todo: Todo) => (
            <TodoCard
              key={todo.id}
              {...todo}
              onRemove={() => removeTodo(todo.id)}
              onUpdate={updateTodo}
            />
          ))
        ) : (
          <div className="text-gray-500 text-center mt-4">No todos found.</div>
        )}
      </div>

      {/* Infinite Scroll Trigger (only show if there are more pages) */}
      {hasNextPage && <div ref={ref} className="h-10" />}

      {isFetchingNextPage && <p className="text-center p-2">Loading more...</p>}
    </div>
  );
};

export default TodoList;
