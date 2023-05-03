import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ITodoList} from '../todolist.model';
import {environment} from '../../environment/enviroment.prod';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TodolistService {
  todoLists$= new BehaviorSubject<ITodoList[]>([])
  constructor(private http: HttpClient) {
  }

  getTodos() {
    this.http.get<ITodoList[]>(`${environment.baseUrl}/todo-lists`).subscribe((todos) => {
      this.todoLists$.next(todos)
    });
  }
}

