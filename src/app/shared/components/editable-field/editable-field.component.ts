import {Component, Input} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {TodolistService} from "../../../todos/services/todolist.service";

@Component({
  selector: 'app-editable-field',
  templateUrl: './editable-field.component.html',
  styleUrls: ['./editable-field.component.scss']
})
export class EditableFieldComponent {

  @Input() title = ""
  @Input() todolistId = ""

  constructor(private todolistService: TodolistService) {
  }

  isEditMode = false

  activateEditModeHandler() {
    this.isEditMode = true
  }
  editTitleHandler() {
    debugger
    this.todolistService.editTodolistTitle(this.todolistId, this.title)
    this.isEditMode = false
  }
}
