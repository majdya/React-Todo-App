// import { Card, CardHeader, CardTitle } from "../ui/card";

import { Checkbox } from "@/components/ui/checkbox";
import { TodoCardProps } from "@/types/todo";

import { Label } from "@/components/ui/label";

const TodoCard = ({ id, title, completed, onClick }: TodoCardProps) => {
  return (
    <>
      <div className={` p-4`}>
        <div className={`flex items-center space-x-4  `}>
          <Checkbox id={id} checked={completed} onCheckedChange={onClick} />
          <Label
            className={`
              text-3xl 
              ${completed ? `line-through text-indigo-400` : ""}
              `}
            htmlFor={id}
          >
            {title}
          </Label>
        </div>
      </div>
    </>
  );
};

export default TodoCard;
