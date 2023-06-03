import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {DomainTodolist, ITodoList, TFilterType} from '../todolist.model';
import {environment} from '../../environment/enviroment.prod';
import {BehaviorSubject, catchError, EMPTY, map} from 'rxjs';
import {ICommonResponse} from '../../shared/models/core.model';
import {NotificationService} from "../../core/services/notification.service";

@Injectable({
  providedIn: 'root',
})
export class TodolistService {
  todoLists$ = new BehaviorSubject<DomainTodolist[]>([]);

  constructor(private http: HttpClient, private notificationService: NotificationService) {
  }

  getTodos() {
    this.http.get<ITodoList[]>(`${environment.baseUrl}/todo-lists`).pipe(map(todolist => {
      return todolist.map(item => ({...item, filter: "all" as TFilterType}))
    }))
      .pipe(catchError(this.errorHandler.bind(this)))
      .subscribe((todos) => {
        this.todoLists$.next(todos)
      });
  }

  addTodos(title: string | null) {
    this.http.post<ICommonResponse<{ item: ITodoList }>>(`${environment.baseUrl}/todo-lists/`, {title})
      .pipe(catchError(this.errorHandler.bind(this))).pipe(map(res => {
      const stateTodos = this.todoLists$.getValue()
      const newTodo: DomainTodolist = {...res.data.item, filter: "all"}
      return [newTodo, ...stateTodos]
    })).subscribe((res) => {
      this.todoLists$.next(res);
    })
  }

  deleteTodolist(todolistId: string) {
    this.http.delete(`${environment.baseUrl}/todo-lists/${todolistId}`)
      .pipe(catchError(this.errorHandler.bind(this)))
      .pipe(
        map(() => this.todoLists$.getValue().filter(tl => tl.id !== todolistId),
        ),
      ).subscribe(todos => this.todoLists$.next(todos));
  }

  editTodolistTitle(todolistId: string, todolistTitle: string) {
    this.http.put(`${environment.baseUrl}/todo-lists/${todolistId}`, {
      title: todolistTitle
    })
      .pipe(catchError(this.errorHandler.bind(this)))
      .pipe(map(() => {
        const stateTodos = this.todoLists$.getValue()
        return stateTodos.map(tl => tl.id === todolistId ? {...tl, title: todolistTitle} : tl)
      }))
      .subscribe(todos => this.todoLists$.next(todos));
  }

  updateTodolistFilter(filter: TFilterType, todoListId: string) {

    const stateTodolists: DomainTodolist[] = this.todoLists$.getValue()
      .map(item => item.id === todoListId ? {...item, filter} : item)
    this.todoLists$.next(stateTodolists)
  }

  private errorHandler(err: HttpErrorResponse) {
    this.notificationService.handleError(err.message)
    return EMPTY
  }
}

