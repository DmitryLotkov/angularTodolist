import {Component, OnInit} from '@angular/core';
import {TodolistService} from '../../services/todolist.service';
import {Observable} from 'rxjs';
import {ITodoList} from '../../todolist.model';


@Component({
  selector: 'app-todo-lists',
  templateUrl: './todo-lists.component.html',
  styleUrls: ['./todo-lists.component.scss'],
})
export class TodoListsComponent implements OnInit {
  todos$!: Observable<ITodoList[]>

  constructor(private todolistService: TodolistService) {}

  ngOnInit() {
    this.todolistService.getTodos();
    this.todos$ = this.todolistService.todoLists$;
  }
}
