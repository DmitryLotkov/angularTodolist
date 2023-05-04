import {Component, Input} from '@angular/core';
import {ITodoList} from '../../../../todolist.model';
import {TodolistService} from '../../../../services/todolist.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss'],
})
export class TodoComponent {
  @Input() todolist!: ITodoList

  constructor(private todolistService: TodolistService ) {
  }
  deleteTodoHandler() {
    this.todolistService.deleteTodolist(this.todolist.id)
  }

}
