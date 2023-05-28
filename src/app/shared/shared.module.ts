import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { AddItemFormComponent } from './components/add-item-form/add-item-form.component';
import {InputTextModule} from 'primeng/inputtext';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ButtonModule} from 'primeng/button';
import { EditableFieldComponent } from './components/editable-field/editable-field.component';
import { NotifyComponentComponent } from './components/notify-component/notify-component.component';
import {MessagesModule} from "primeng/messages";


@NgModule({
  declarations: [
    AddItemFormComponent,
    EditableFieldComponent,
    NotifyComponentComponent,
  ],
  imports: [
    CommonModule,
    SharedRoutingModule,
    InputTextModule,
    ReactiveFormsModule,
    ButtonModule,
    FormsModule,
    MessagesModule,
  ],
    exports: [
        AddItemFormComponent,
        EditableFieldComponent,
        NotifyComponentComponent,
    ],
})
export class SharedModule { }
