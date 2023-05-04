import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-add-item-form',
  templateUrl: './add-item-form.component.html',
  styleUrls: ['./add-item-form.component.scss']
})
export class AddItemFormComponent implements OnInit{
  @Output() submitTodoTitle = new EventEmitter<string>()
  @Input() formPlaceholder!: string
  addItemForm!: FormGroup

  get inputData(){
    return this.addItemForm.get('inputData')
  }
  ngOnInit(): void {
    this.addItemForm = new FormGroup({
      inputData: new FormControl("", [
        Validators.maxLength(100),
        Validators.minLength(4),
      ]),
    })
  }

  inputHandler() {
    this.submitTodoTitle.emit(this.addItemForm.value)
    this.addItemForm.reset()
  }
}
