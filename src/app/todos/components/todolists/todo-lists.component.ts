import {Component, OnInit} from '@angular/core';
import {TodolistService} from '../../services/todolist.service';
import {Observable} from 'rxjs';
import {DomainTodolist} from '../../todolist.model';


@Component({
  selector: 'app-todo-lists',
  templateUrl: './todo-lists.component.html',
  styleUrls: ['./todo-lists.component.scss'],
})
export class TodoListsComponent implements OnInit {
  todos$!: Observable<DomainTodolist[]>

  constructor(private todolistService: TodolistService) {}

  ngOnInit() {
    this.todolistService.getTodos();
    this.todos$ = this.todolistService.todoLists$;
  }
}
