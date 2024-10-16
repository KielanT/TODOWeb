export interface Task{
  name: string;
  taskDesc: string;
  dueDate: Date;
  complete: boolean
}

export interface List {
  name: string;
  tasks: Task[];
}