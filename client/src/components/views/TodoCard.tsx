import { Card, CardHeader, CardTitle } from "../ui/card";

import { Checkbox } from "@/components/ui/checkbox";
import { Todo } from "@/types/todo";

interface TodoCardProps extends Todo {
  onClick: () => void;
}

const TodoCard = ({ id, title, completed, onClick }: TodoCardProps) => {
  return (
    <Card key={id} className="cursor-pointer  w-[40%]" onClick={onClick}>
      <CardHeader className="flex flex-row gap-2 items-center">
        <Checkbox
          id={id.toString()}
          checked={completed}
          onCheckedChange={onClick} // Toggle when clicked
        />
        <CardTitle>{title}</CardTitle>
      </CardHeader>
    </Card>
  );
};

export default TodoCard;
