import {Component, Input} from '@angular/core';
import {ITodoList} from '../../../todolist.model';
import {TodolistService} from '../../../services/todolist.service';
import {TasksService} from "../../../services/tasks.service";

@Component({
  selector: 'app-todo',
  templateUrl: './todoList.component.html',
  styleUrls: ['./todoList.component.scss'],
})
export class TodoListComponent {

  @Input() todolist!: ITodoList

  constructor(private todolistService: TodolistService,
              private taskService: TasksService) {
  }

  deleteTodoHandler():void {
    this.todolistService.deleteTodolist(this.todolist.id)
  }
  createTask(title: string | null):void {
    this.taskService.createTask(this.todolist.id, title)
  }
  editTodolistTitle(title: string):void {
    return this.todolistService.editTodolistTitle(this.todolist.id, title)
  }
}
