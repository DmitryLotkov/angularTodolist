import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { AddItemFormComponent } from './components/add-item-form/add-item-form.component';
import {InputTextModule} from 'primeng/inputtext';
import {ReactiveFormsModule} from '@angular/forms';
import {ButtonModule} from 'primeng/button';


@NgModule({
  declarations: [
    AddItemFormComponent,
  ],
  imports: [
    CommonModule,
    SharedRoutingModule,
    InputTextModule,
    ReactiveFormsModule,
    ButtonModule,
  ],
  exports: [
    AddItemFormComponent,
  ],
})
export class SharedModule { }
