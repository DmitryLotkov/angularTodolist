import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {BehaviorSubject, catchError, EMPTY, map} from 'rxjs';
import {environment} from '../../environment/enviroment.prod';
import {DomainTasks, IGetTasksResponse, ITask, UpdateTaskModel} from '../components/tasks/model/task.model';
import {ICommonResponse, ResultCodes} from "../../shared/models/core.model";
import {NotificationService} from "../../core/services/notification.service";


@Injectable({
  providedIn: 'root',
})
export class TasksService {

  constructor(private http: HttpClient, private notificationService: NotificationService) {}

  tasks$ = new BehaviorSubject<DomainTasks>({})

  getTasks(todoListId: string) {
    return this.http
      .get<IGetTasksResponse>(`${environment.baseUrl}/todo-lists/${todoListId}/tasks`)
      .pipe(catchError(this.errorHandler.bind(this))).subscribe((res) => {
        if (!res.error) {
          const stateTasks = this.tasks$.getValue()
          stateTasks[todoListId] = res.items
          this.tasks$.next(stateTasks)
        } else {
          this.notificationService.handleError(res.error)
        }
      })

  }

  createTask(todoListId: string, title: string | null) {
    return this.http
      .post<ICommonResponse<{ item: ITask }>>(`${environment.baseUrl}/todo-lists/${todoListId}/tasks`, {title})
      .pipe(catchError(this.errorHandler.bind(this))).subscribe((res) => {
        if (res.resultCode === ResultCodes.success) {
          const stateTasks = this.tasks$.getValue()
          stateTasks[todoListId] = [res.data.item, ...stateTasks[todoListId]]
          this.tasks$.next(stateTasks)
        } else {
          this.notificationService.handleError(res.messages[0])
        }
      })
  }

  deleteTask(todoListId: string, taskId: string) {
    return this.http.delete<ICommonResponse>(`${environment.baseUrl}/todo-lists/${todoListId}/tasks/${taskId}`)
      .pipe(catchError(this.errorHandler.bind(this))).subscribe((res) => {
        if (res.resultCode === ResultCodes.success) {
          const stateTasks = this.tasks$.getValue()
          stateTasks[todoListId] = stateTasks[todoListId].filter(task => task.id !== taskId)
          this.tasks$.next(stateTasks)
        }
      })
  }

  updateTaskTitle(model: ITask) {
    return this.http.put<ICommonResponse<{ data: { item: ITask } }>>
    (`${environment.baseUrl}/todo-lists/${model.todoListId}/tasks/${model.id}`, {title: model.title})
      .pipe(catchError(this.errorHandler.bind(this))).subscribe((res) => {
        if (res.resultCode === ResultCodes.success) {
          const stateTasks = this.tasks$.getValue()
          stateTasks[model.todoListId] = stateTasks[model.todoListId]
            .map(task => task.id === model.id ? {...task, title: model.title} : task)
          this.tasks$.next(stateTasks)
        }
      })
  }

  updateTaskStatus(todoListId: string, taskId: string, model: UpdateTaskModel) {
    return this.http.put<ICommonResponse<{ data: { item: ITask } }>>
    (`${environment.baseUrl}/todo-lists/${todoListId}/tasks/${taskId}`, model)
      .pipe(catchError(this.errorHandler.bind(this))).subscribe((res) => {
        if (res.resultCode === ResultCodes.success) {
          const stateTasks = this.tasks$.getValue()
          stateTasks[todoListId] = stateTasks[todoListId]
            .map(task => task.id === taskId ? {...task, ...model} : task)
          this.tasks$.next(stateTasks)
        }
      })
  }
  private errorHandler(err: HttpErrorResponse) {
    this.notificationService.handleError(err.message)
    return EMPTY
  }
}
