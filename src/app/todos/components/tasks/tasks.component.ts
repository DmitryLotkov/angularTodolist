import {Component, Input, OnInit} from '@angular/core';
import {TasksService} from '../../services/tasks.service';
import {combineLatest, map, Observable} from 'rxjs';
import {ITask, TaskStatusEnum} from './model/task.model';
import {DomainTodolist} from "../../todolist.model";
import {TodolistService} from "../../services/todolist.service";


@Component({
    selector: 'app-tasks',
    templateUrl: './tasks.component.html',
    styleUrls: ['./tasks.component.scss'],
    standalone: false
})
export class TasksComponent implements OnInit {
  @Input() todoList!: DomainTodolist;
  tasks$?: Observable<ITask[]>;
  constructor(private taskService: TasksService, private todolistService: TodolistService) {
  }
  taskStatusEnum = TaskStatusEnum
  ngOnInit(): void {

    this.tasks$ = combineLatest([this.taskService.tasks$, this.todolistService.todoLists$]).pipe(map((res) =>{
      const tasks = res[0] //все таски
      const todos = res[1] //все тудулисты
      const activeTodo = todos.find(tl => tl.id === this.todoList.id)
      let tasksForTodo = tasks[this.todoList.id]
      if(activeTodo?.filter === "completed") {
        tasksForTodo = tasksForTodo.filter(task => task.status === TaskStatusEnum.completed)
      }
      if(activeTodo?.filter === "active") {
        tasksForTodo = tasksForTodo.filter(task => task.status === TaskStatusEnum.active)
      }
      return tasksForTodo
    }))


    this.taskService.getTasks(this.todoList.id);
  }

}
