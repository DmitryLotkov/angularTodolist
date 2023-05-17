import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TodosRoutingModule } from './todos-routing.module';
import { TodoListsComponent } from './components/todolists/todo-lists.component';
import { TodoListComponent } from './components/todolists/todolist/todoList.component';
import { TasksComponent } from './components/tasks/tasks.component';
import {PanelModule} from 'primeng/panel';
import {CardModule} from 'primeng/card';
import {CheckboxModule} from 'primeng/checkbox';
import {FormsModule} from '@angular/forms';
import {ButtonModule} from 'primeng/button';
import {SharedModule} from '../shared/shared.module';
import { TaskComponent } from './components/tasks/task/task.component';
import { TodolistFilterComponent } from './components/todolists/task-filter/todolist-filter.component';
import {MenubarModule} from "primeng/menubar";


@NgModule({
  declarations: [
    TodoListsComponent,
    TodoListComponent,
    TasksComponent,
    TaskComponent,
    TodolistFilterComponent
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
    MenubarModule,
  ],
})
export class TodosModule { }
