export interface Todo {
  id: string;
  title: string;
  completed: boolean;
}

export interface TodoCardProps extends Todo {
  onUpdate: (todo: Todo) => void;
  onRemove: (id: string) => void;
}
