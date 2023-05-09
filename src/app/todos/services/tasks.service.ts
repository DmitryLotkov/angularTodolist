import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, map} from 'rxjs';
import {environment} from '../../environment/enviroment.prod';
import {DomainTasks, IGetTasksResponse, ITask, UpdateTaskModel} from '../components/tasks/model/task.model';
import {ICommonResponse} from "../../shared/models/core.model";


@Injectable({
  providedIn: 'root',
})
export class TasksService {

  constructor(private http: HttpClient) {
  }

  tasks$ = new BehaviorSubject<DomainTasks>({})

  getTasks(todoListId: string) {
    return this.http
      .get<IGetTasksResponse>(`${environment.baseUrl}/todo-lists/${todoListId}/tasks`)
      .pipe(map(res => res.items))
      .subscribe((tasks: ITask[]) => {

        const stateTasks = this.tasks$.getValue()
        stateTasks[todoListId] = tasks
        this.tasks$.next(stateTasks)
      })

  }

  createTask(todoListId: string, title: string | null) {
    return this.http
      .post<ICommonResponse<{ item: ITask }>>(`${environment.baseUrl}/todo-lists/${todoListId}/tasks`, {title})
      .pipe(map((res) => {
        const stateTasks = this.tasks$.getValue()
        stateTasks[todoListId] = [res.data.item, ...stateTasks[todoListId]]
        return stateTasks
      }))
      .subscribe((tasks: DomainTasks) => {
        this.tasks$.next(tasks)
      })
  }

  deleteTask(todoListId: string, taskId: string) {
    return this.http.delete<ICommonResponse>(`${environment.baseUrl}/todo-lists/${todoListId}/tasks/${taskId}`)
      .pipe(map(() => {
        const stateTasks = this.tasks$.getValue()
        stateTasks[todoListId] = stateTasks[todoListId].filter(task => task.id !== taskId)
        return stateTasks
      })).subscribe((tasks) => {
        this.tasks$.next(tasks)
      })
  }

  updateTaskTitle(model:ITask) {
    return this.http.put<ICommonResponse<{ data: { item: ITask } }>>
    (`${environment.baseUrl}/todo-lists/${model.todoListId}/tasks/${model.id}`, {title:model.title})
      .pipe(map(() => {
      const stateTasks = this.tasks$.getValue()
      stateTasks[model.todoListId] = stateTasks[model.todoListId]
        .map(task => task.id === model.id ? {...task, title: model.title} : task)
      return stateTasks
    })).subscribe((tasks) => {
      this.tasks$.next(tasks)
    })
  }

  updateTaskStatus(todoListId: string, taskId: string, model: UpdateTaskModel) {
    return this.http.put<ICommonResponse<{ data: { item: ITask } }>>
    (`${environment.baseUrl}/todo-lists/${todoListId}/tasks/${taskId}`, model)
      .pipe(map(() => {
        const stateTasks = this.tasks$.getValue()
        stateTasks[todoListId] = stateTasks[todoListId]
          .map(task => task.id === taskId ? {...task, ...model} : task)
        return stateTasks
      })).subscribe((tasks) => {
        this.tasks$.next(tasks)
      })
  }

}
