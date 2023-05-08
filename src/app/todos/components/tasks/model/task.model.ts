export interface ITask {
  description: string;
  title: string;
  completed: boolean;
  priority: number;
  startDate: Date;
  deadline: Date;
  id: string;
  todoListId: string;
  order: number;
  addedDate: Date;
}

export interface IGetTasksResponse {
  items: ITask[];
  totalCount: number;
  error: null | string;
}

export interface DomainTasks {
  [key: string] : ITask[]
}
