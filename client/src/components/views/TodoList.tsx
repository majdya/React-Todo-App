import React, { Suspense } from "react";

import { useQuery } from "@tanstack/react-query";
import { getTodos } from "@/queries/todosQueries";

import { Input } from "@/components/ui/input";
import { Button } from "../ui/button";

import { Todo } from "@/types/todo";
import TodoCard from "./TodoCard";
import { useState } from "react";

const TodoList = () => {
  const { data: initialTodos } = useQuery<Todo[]>({
    queryKey: ["todos"],
    queryFn: getTodos,
    suspense: true,
  });

  const [todos, setTodos] = useState<Todo[]>(initialTodos || []);

  const toggleTodo = (id: string) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div
        key="container"
        className="flex flex-col w-[95%] items-center mt-20 gap-5"
      >
        <div className="flex flex-row gap-2">
          <Input
            className="field-sizing-content"
            placeholder="New Todo"
          ></Input>
          <Button className="w-fit">Add Todo</Button>
        </div>

        {todos.map((todo) => (
          <TodoCard
            key={todo.id}
            {...todo}
            onClick={() => toggleTodo(todo.id)}
          />
        ))}
      </div>
    </Suspense>
  );
};
export default TodoList;
