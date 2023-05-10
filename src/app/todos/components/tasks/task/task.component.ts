import {Component, Input, OnInit} from '@angular/core';
import {ITask, TaskStatusEnum} from "../model/task.model";
import {TasksService} from "../../../services/tasks.service";

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {
  @Input() task!: ITask

  checked!: number | undefined
  taskStatusEnum = TaskStatusEnum

  ngOnInit() {
    this.checked = this.task.status
  }

  constructor(private taskService: TasksService) {}

  deleteTaskHandler(taskId: string) {
    this.taskService.deleteTask(this.task.todoListId, taskId)
  }

  editTaskTitleHandler(taskTitle:string) {
    const model: ITask = {
      ...this.task,
      title: taskTitle,
    }
    this.taskService.updateTaskTitle(model)
  }

  editTaskStatusHandler() {
    const model: ITask = {
      ...this.task,
      status: this.checked === TaskStatusEnum.active ? TaskStatusEnum.completed : TaskStatusEnum.active,
    }
    this.taskService.updateTaskStatus(this.task.todoListId, this.task.id, model)
  }
}
