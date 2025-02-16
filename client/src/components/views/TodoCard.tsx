import { Checkbox } from "@/components/ui/checkbox";
import { TodoCardProps } from "@/types/todo";
import { Label } from "@/components/ui/label";
import { Trash } from "lucide-react";
import { Button } from "../ui/button";

const TodoCard = ({
  id,
  title,
  completed,
  onClick,
  onRemove,
}: TodoCardProps) => {
  return (
    <div className="px-4 py-2 m-1 rounded-lg bg-gray-100 shadow-sm">
      <div className="flex items-center space-x-4">
        <Button variant="destructive" onClick={() => onRemove(id)}>
          <Trash />
        </Button>
        <Checkbox
          id={id}
          checked={completed}
          onCheckedChange={() => onClick(id)}
        />
        <Label
          className={` line-clamp-2 lg:line-clamp-1 text-2xl ${
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
