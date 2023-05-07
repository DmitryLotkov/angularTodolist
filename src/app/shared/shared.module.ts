import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { AddItemFormComponent } from './components/add-item-form/add-item-form.component';
import {InputTextModule} from 'primeng/inputtext';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ButtonModule} from 'primeng/button';
import { EditableFieldComponent } from './components/editable-field/editable-field.component';


@NgModule({
  declarations: [
    AddItemFormComponent,
    EditableFieldComponent,
  ],
  imports: [
    CommonModule,
    SharedRoutingModule,
    InputTextModule,
    ReactiveFormsModule,
    ButtonModule,
    FormsModule,
  ],
    exports: [
        AddItemFormComponent,
        EditableFieldComponent,
    ],
})
export class SharedModule { }
