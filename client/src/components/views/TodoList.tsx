import { useState, useMemo } from "react";
import { useTodos, useJPHTodos } from "@/queries/todosQueries";
import { Todo, TodoCardProps } from "@/types/todo";
import TodoCard from "./TodoCard";
import AddTodo from "./AddTodo";
import SearchTodo from "./SearchTodo";
import {
  useToggleTodoMutation,
  useUpdateTitleMutation,
  useRemoveTodoMutation,
} from "@/mutations/todoMutations";

const TodoList = () => {
  const { data: todos = [], error, isLoading } = useJPHTodos();

  const [searchTerm, setSearchTerm] = useState("");

  const filteredTodos = useMemo(
    () =>
      todos.filter((todo: Todo) => {
        return todo.title.toLowerCase().includes(searchTerm.toLowerCase());
      }),
    [todos, searchTerm]
  );

  const toggleTodoMutation = useToggleTodoMutation();
  const updateTitleMutation = useUpdateTitleMutation();
  const removeTodoMutation = useRemoveTodoMutation();

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="container mx-auto max-w-[90%] lg:max-w-[50%] mt-6 p-4 lg:p-8 rounded-3xl bg-zinc-300">
      <AddTodo />
      <SearchTodo onSearch={setSearchTerm} />

      <div className="grid grid-cols-1 mt-4">
        {filteredTodos.map((todo: TodoCardProps) => (
          <TodoCard
            key={todo.id}
            {...todo}
            onClick={() => toggleTodoMutation.mutate(todo.id)}
            onUpdate={(id, newTitle) => {
              return updateTitleMutation.mutate({
                id,
                newTitle,
              });
            }}
            onRemove={() => removeTodoMutation.mutate(todo.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default TodoList;
