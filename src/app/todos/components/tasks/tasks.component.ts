import {Component, Input, OnInit} from '@angular/core';
import {TasksService} from '../../services/tasks.service';
import {Observable} from 'rxjs';
import {ITask} from './model/task.model';


@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss'],
})
export class TasksComponent implements OnInit {
  @Input() todoListId!: string;
  tasks$: Observable<ITask[]> | undefined;
  taskIsCompleted!: boolean

  constructor(private taskService: TasksService) {
  }

  ngOnInit(): void {
    this.tasks$ = this.taskService.getTasks(this.todoListId);
  }
}
