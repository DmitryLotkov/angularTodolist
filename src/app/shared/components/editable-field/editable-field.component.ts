import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-editable-field',
  templateUrl: './editable-field.component.html',
  styleUrls: ['./editable-field.component.scss']
})
export class EditableFieldComponent {

  @Input() title = ""
  @Output() submitInputData = new EventEmitter<string>()

  isEditMode = false

  activateEditModeHandler() {
    this.isEditMode = true
  }

  editTitleHandler() {
    this.submitInputData.emit(this.title)
    this.isEditMode = false
  }
}
