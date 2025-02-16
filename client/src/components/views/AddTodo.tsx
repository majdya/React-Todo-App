import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus } from "lucide-react";
import { v4 as uuidv4 } from "uuid";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Todo } from "@/types/todo";
const MAX_LENGTH = 50;

const AddTodo = () => {
  const queryClient = useQueryClient();
  const [newTodoText, setNewTodoText] = useState("");

  const addTodoMutation = useMutation({
    mutationFn: async (newTodo: Todo) => {
      // TODO: replace with api
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
    if (text.length > 0) {
      addTodoMutation.mutate({
        id: uuidv4(),
        title: text,
        completed: false,
      });
    }
  };

  return (
    <div className="flex items-center p-3 gap-3 relative">
      <Input
        placeholder="Add a New Todo"
        value={newTodoText}
        onChange={(e) => setNewTodoText(e.target.value)}
        maxLength={MAX_LENGTH}
        className="flex-grow"
      />
      <Button
        onClick={handleAddTodo}
        disabled={!newTodoText.trim()}
        className="relative"
      >
        <span className="absolute bottom-2.5 right-18 text-xs text-gray-600  px-1 rounded">
          {newTodoText.length}/{MAX_LENGTH}
        </span>
        <Plus size={40} />
      </Button>
    </div>
  );
};

export default AddTodo;
