import {Component, OnInit} from '@angular/core';
import {TodolistService} from '../../services/todolist.service';
import {Observable} from 'rxjs';
import {DomainTodolist} from '../../todolist.model';
import {MenuItem} from "primeng/api";
import {AuthService} from "../../../core/services/auth.service";


@Component({
    selector: 'app-todo-lists',
    templateUrl: './todo-lists.component.html',
    styleUrls: ['./todo-lists.component.scss'],
    standalone: false
})
export class TodoListsComponent implements OnInit {
  todos$!: Observable<DomainTodolist[]>
  item!: MenuItem[];

  constructor(private todolistService: TodolistService, private authService: AuthService) {
  }

  ngOnInit() {
    this.todolistService.getTodos();
    this.todos$ = this.todolistService.todoLists$;

    this.item = [
      {
        label: 'Quit',
        icon: 'pi pi-fw pi-power-off'
      }
    ];
  }


  createTodoList(inputTitle: string | null) {
    this.todolistService.addTodos(inputTitle)
  }

  logoutHandler() {
    this.authService.logOut()
  }

}
