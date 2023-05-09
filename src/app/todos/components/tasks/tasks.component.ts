import {Component, Input, OnInit} from '@angular/core';
import {TasksService} from '../../services/tasks.service';
import {map, Observable} from 'rxjs';
import {ITask, TaskStatusEnum} from './model/task.model';


@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss'],
})
export class TasksComponent implements OnInit {
  @Input() todoListId!: string;
  tasks$?: Observable<ITask[]>;
  constructor(private taskService: TasksService) {
  }
  taskStatusEnum = TaskStatusEnum
  ngOnInit(): void {
    this.tasks$ = this.taskService.tasks$.pipe(map((tasks) => tasks[this.todoListId]))
    this.taskService.getTasks(this.todoListId);
  }

  protected readonly TaskStatusEnum = TaskStatusEnum;
}
