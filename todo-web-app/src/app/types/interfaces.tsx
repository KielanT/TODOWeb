export interface Task{
  name: string;
  taskDesc: string;
  dueDate: Date;
}

export interface List {
  name: string;
  tasks: Task[];
}