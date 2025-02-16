// src/components/TodoList.jsx
import { useState, useEffect, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { getTodos } from "@/queries/todosQueries";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Todo } from "@/types/todo";
import TodoCard from "./TodoCard";
import { v4 as uuidv4 } from "uuid";

import { Search, Plus } from "lucide-react";

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
    <>
      <div
        className={`
        container mx-auto 
        max-w-[90%] lg:max-w-[50%]   
        mt-6  
        p-4 lg:p-8
        rounded-3xl  bg-gray-200
         `}
      >
        <div className="flex items-center mt-4 gap-3">
          <Input
            placeholder="Add a New Todo"
            value={newTodoText}
            onChange={(e) => setNewTodoText(e.target.value)}
            className="flex-grow"
          />
          <Button onClick={handleAddTodo}>
            <Plus size={40} />
          </Button>
        </div>

        <div className="flex items-center mt-4 gap-3">
          <Input
            placeholder="Search in Todos"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-grow"
          />
          <Search size={40} />
        </div>

        <div className="grid grid-cols-1  mt-4">
          {filteredTodos.map((todo) => (
            <TodoCard
              key={todo.id}
              {...todo}
              onClick={() => toggleTodo(todo.id)}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default TodoList;
