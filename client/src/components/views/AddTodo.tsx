import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus } from "lucide-react";
import { v4 as uuidv4 } from "uuid";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Todo } from "@/types/todo";

const AddTodo = () => {
  const queryClient = useQueryClient();
  const [newTodoText, setNewTodoText] = useState("");

  const addTodoMutation = useMutation({
    mutationFn: async (newTodo: Todo) => {
      return newTodo;
    },
    onSuccess: (newTodo) => {
      queryClient.setQueryData(["todos"], (oldTodos: Todo[] = []) => [
        ...oldTodos,
        newTodo,
      ]);
      setNewTodoText("");
    },
  });

  const handleAddTodo = () => {
    const text = newTodoText.trim();
    if (text) {
      addTodoMutation.mutate({
        id: uuidv4(),
        title: text,
        completed: false,
      });
    }
  };

  return (
    <div className="flex items-center p-3 gap-3">
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
  );
};

export default AddTodo;
