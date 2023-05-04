import { Component } from '@angular/core';
import {TodolistService} from './todos/services/todolist.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'todo';
  constructor(private todolistService:TodolistService) {
  }

  getTodolistTitle(inputTitle: string) {
    this.todolistService.addTodos(inputTitle)
  }

}
