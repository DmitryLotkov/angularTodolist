import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-add-item-form',
  templateUrl: './add-item-form.component.html',
  styleUrls: ['./add-item-form.component.scss']
})
export class AddItemFormComponent implements OnInit{
  @Output() submitTitle = new EventEmitter<string | null>()
  @Input() isFullWidth!: boolean
  @Input() formPlaceholder!: string
  addItemForm!: FormGroup<{ inputData: FormControl<string | null> }>

  get inputData(){
    return this.addItemForm.get('inputData')
  }
  ngOnInit(): void {
    this.addItemForm = new FormGroup({
      inputData: new FormControl<string | null>("", [
        Validators.maxLength(100),
        Validators.minLength(4),
      ]),
    })
  }

  inputHandler() {
    if(this.addItemForm.value.inputData && this.addItemForm.valid) {
      this.submitTitle.emit(this.addItemForm.value.inputData)
      this.addItemForm.reset()
    }
  }
}
