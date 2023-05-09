export interface ITask extends UpdateTaskModel{
  id: string;
  todoListId: string;
  order: number;
  addedDate: Date;

}
export interface UpdateTaskModel {
  title: string;
  description?: string;
  completed?: boolean;
  status?: number
  priority?: number;
  startDate?: Date;
  deadline?: Date;
}

export interface IGetTasksResponse {
  items: ITask[];
  totalCount: number;
  error: null | string;
}

export interface DomainTasks {
  [key: string] : ITask[]
}

export enum TaskStatusEnum {
  active = 0,
  completed = 1
}
