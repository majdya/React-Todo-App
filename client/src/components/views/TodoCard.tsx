import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { TodoCardProps } from "@/types/todo";
import { Label } from "@/components/ui/label";
import { Trash, Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

const TodoCard = ({
  id,
  title,
  completed,
  onRemove,
  onUpdate,
}: TodoCardProps) => {
  const [newTitle, setNewTitle] = useState(title);
  const [open, setOpen] = useState(false);

  const handleUpdateTitle = () => {
    if (newTitle.trim() && newTitle !== title) {
      onUpdate({ id, title: newTitle, completed });
    }
    setOpen(false);
  };

  const handleToggleCompleted = () => {
    onUpdate({ id, title, completed: !completed });
  };

  return (
    <div className="px-4 py-2 m-1 rounded-lg bg-gray-100 shadow-sm">
      <div className="flex flex-row items-center space-x-4">
        <div className="flex flex-col lg:flex-row gap-2">
          <Button variant="destructive" onClick={() => onRemove(id)}>
            <Trash />
          </Button>

          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button variant="default">
                <Pencil strokeWidth={2} size={20} />
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Edit Todo Title</DialogTitle>
                <DialogDescription>
                  Update your task title and click Save.
                </DialogDescription>
              </DialogHeader>
              <Input
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
              />
              <DialogFooter>
                <Button variant="secondary" onClick={() => setOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleUpdateTitle}>Save</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <Checkbox
          id={id}
          checked={completed}
          onCheckedChange={handleToggleCompleted}
        />

        <Label
          className={`line-clamp-2 lg:line-clamp-1 text-2xl ${
            completed ? "line-through text-indigo-400" : ""
          }`}
          htmlFor={id}
        >
          {title}
        </Label>
      </div>
    </div>
  );
};

export default TodoCard;
