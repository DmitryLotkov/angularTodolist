import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ITodoList} from '../todolist.model';
import {environment} from '../../environment/enviroment.prod';
import {BehaviorSubject, map} from 'rxjs';
import {ICommonResponse} from '../../shared/models/core.model';

@Injectable({
  providedIn: 'root',
})
export class TodolistService {
  todoLists$ = new BehaviorSubject<ITodoList[]>([]);

  constructor(private http: HttpClient) {
  }

  getTodos() {
    this.http.get<ITodoList[]>(`${environment.baseUrl}/todo-lists`).subscribe((todos) => {
      this.todoLists$.next(todos);
    });
  }

  addTodos(title: string | null) {
    this.http.post<ICommonResponse<{ item: ITodoList }>>(`${environment.baseUrl}/todo-lists/`, {title})
      .pipe(map(res => {
        const stateTodos = this.todoLists$.getValue()
        const newTodo = res.data.item
        return [newTodo, ...stateTodos]
      })).subscribe((res) => {
      this.todoLists$.next(res);
    })
  }

  deleteTodolist(todolistId: string) {
    this.http.delete(`${environment.baseUrl}/todo-lists/${todolistId}`)
      .pipe(
        map(() => this.todoLists$.getValue().filter(tl => tl.id !== todolistId),
        ),
      ).subscribe(todos => this.todoLists$.next(todos));
  }

  editTodolistTitle(todolistId: string, todolistTitle: string) {
    this.http.put(`${environment.baseUrl}/todo-lists/${todolistId}`, {
      title: todolistTitle
    })
      .pipe(map(() => {
      const stateTodos = this.todoLists$.getValue()
      return stateTodos.map(tl => tl.id === todolistId ? {...tl, title: todolistTitle} : tl)
    }))
      .subscribe(todos => this.todoLists$.next(todos));
  }
}

