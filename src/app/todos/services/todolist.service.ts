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

  addTodos(title: string) {
    this.http.post<ICommonResponse<{item: ITodoList}>>(`${environment.baseUrl}/todo-lists/`, {
      title,
    }).subscribe((res) => {
      console.log(res);
    });
  }

  deleteTodolist(todolistId: string) {
    this.http.delete(`${environment.baseUrl}/todo-lists/${todolistId}`)
      .pipe(
        map(() => this.todoLists$.getValue().filter(tl => tl.id !== todolistId)
        )
      ).subscribe(todos => this.todoLists$.next(todos));
  }
}

