export interface ITodoList {
  id: string
  title: string
  addedDate: string
  order: number
}

export type TFilterType = "all" | "completed" | "active"

export interface DomainTodolist extends ITodoList{
  filter: TFilterType
}
