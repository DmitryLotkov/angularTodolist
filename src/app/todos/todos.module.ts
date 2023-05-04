import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TodosRoutingModule } from './todos-routing.module';
import { TodoListsComponent } from './components/todolists/todo-lists.component';
import { TodoComponent } from './components/todolists/todolist/todo/todo.component';
import { TasksComponent } from './components/tasks/tasks.component';
import {PanelModule} from 'primeng/panel';
import {CardModule} from 'primeng/card';
import {CheckboxModule} from 'primeng/checkbox';
import {FormsModule} from '@angular/forms';
import {ButtonModule} from 'primeng/button';
import {SharedModule} from '../shared/shared.module';


@NgModule({
  declarations: [
    TodoListsComponent,
    TodoComponent,
    TasksComponent
  ],
  imports: [
    CommonModule,
    TodosRoutingModule,
    PanelModule,
    CardModule,
    CheckboxModule,
    FormsModule,
    ButtonModule,
    SharedModule,
  ],
})
export class TodosModule { }
