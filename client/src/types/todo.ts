export interface Todo {
  id: string;
  title: string;
  completed: boolean;
}

export interface TodoCardProps extends Todo {
  onClick: (id: string) => void;
  onRemove: (id: string) => void;
}
