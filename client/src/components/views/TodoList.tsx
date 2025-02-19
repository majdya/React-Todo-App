import { useState, useMemo } from "react";
import {
  useTodos,
  useRemoveTodoMutation,
  useUpdateTodoMutation,
} from "@/api/todo";
import { Todo } from "@/types/todo";
import TodoCard from "./TodoCard";
import AddTodo from "./AddTodo";
import SearchTodo from "./SearchTodo";

const TodoList = () => {
  const { data: todos = [], error, isLoading } = useTodos();

  const [searchTerm, setSearchTerm] = useState("");

  const filteredTodos = useMemo(() => {
    return todos
      .filter((todo: Todo) =>
        todo.title.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .sort((a, b) => Number(a.completed) - Number(b.completed)); // Sort: Incomplete first
  }, [todos, searchTerm]);

  /* isLoading: isRemoving*/
  const { mutate: removeTodo } = useRemoveTodoMutation();
  /*isLoading: isUpdating */
  const { mutate: updateTodo } = useUpdateTodoMutation();

  if (error) return <div className="text-red-500">Error: error</div>;
  if (isLoading) return <div>Loading...</div>;
  // if (isUpdating) return <div>Updating...</div>;
  // if (isRemoving) return <div>Removing...</div>;

  return (
    <div className="container mx-auto max-w-[90%] lg:max-w-[50%] mt-6 p-4 lg:p-8 rounded-3xl bg-zinc-300">
      <AddTodo />
      <SearchTodo onSearch={setSearchTerm} />

      <div className="grid grid-cols-1 mt-4">
        {filteredTodos && filteredTodos.length > 0 ? (
          filteredTodos.map((todo: Todo) => (
            <TodoCard
              key={todo.id}
              {...todo}
              onRemove={() => removeTodo(todo.id)}
              onUpdate={updateTodo} // ✅ Ensure updateTodo is passed properly
            />
          ))
        ) : (
          <div className="text-gray-500 text-center mt-4">No todos found.</div>
        )}
      </div>
    </div>
  );
};

export default TodoList;
