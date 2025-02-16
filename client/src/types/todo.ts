export interface Todo {
  id: string;
  title: string;
  completed: boolean;
}

export interface TodoCardProps extends Todo {
  onClick: (id: string) => void;
  onUpdate: (id: string, newTitle: string) => void;
  onRemove: (id: string) => void;
}
