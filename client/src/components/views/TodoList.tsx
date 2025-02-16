// src/components/TodoList.jsx
import { useState, useEffect, useCallback, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { getTodos } from "@/queries/todosQueries";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Todo } from "@/types/todo";
import TodoCard from "./TodoCard";
import { v4 as uuidv4 } from "uuid";
import { MagnifyingGlassCircleIcon } from "@heroicons/react/24/solid"; // Import search icon (example)

const TodoList = () => {
  const { data: initialTodos, isLoading } = useQuery({
    queryKey: ["todos"],
    queryFn: getTodos,
  });

  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodoText, setNewTodoText] = useState("");
  const [searchTerm, setSearchTerm] = useState(""); // State for search term
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(""); // Debounced term

  useEffect(() => {
    if (initialTodos) {
      setTodos(initialTodos);
    }
  }, [initialTodos]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm); // Update debounced term after delay
    }, 300); // Adjust delay as needed (e.g., 300ms)

    return () => clearTimeout(timer); // Clear timer if input changes
  }, [searchTerm]);

  const filteredTodos = useMemo(() => {
    // Memoize filteredTodos
    return todos.filter((todo) =>
      todo.title.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
    );
  }, [todos, debouncedSearchTerm]); // Only recalculate if todos or searchTerm change

  const toggleTodo = (id: string) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const handleAddTodo = () => {
    const text = newTodoText.trim();
    if (text !== "") {
      const newTodo: Todo = {
        id: uuidv4(),
        title: text,
        completed: false,
      };
      setTodos([...todos, newTodo]);
      setNewTodoText("");
    }
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="flex flex-col w-[95%] items-center mt-20 gap-5">
      <div className="flex flex-col ">
        <div className="flex flex-row gap-5">
          <Input
            className="w-full"
            placeholder="New Todo"
            value={newTodoText}
            onChange={(e) => setNewTodoText(e.target.value)}
          />
          <Button className="w-fit" onClick={handleAddTodo}>
            Add Todo
          </Button>
        </div>
        {/* Search Input */}
        {/* Icon container */}
        {/* Add the icon */}
        <div className="flex items-center gap-12 pl-3 ">
          <Input
            className="full"
            placeholder="Search Todos"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <MagnifyingGlassCircleIcon className="h-20 w-20 pointer-events-none" />
        </div>
      </div>
      {filteredTodos.map(
        (
          todo // Render filtered todos
        ) => (
          <TodoCard
            key={todo.id}
            {...todo}
            onClick={() => toggleTodo(todo.id)}
          />
        )
      )}
    </div>
  );
};

export default TodoList;
