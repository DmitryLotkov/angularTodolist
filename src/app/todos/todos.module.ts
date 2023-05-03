import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TodosRoutingModule } from './todos-routing.module';
import { TodoListsComponent } from './components/todolists/todo-lists.component';
import { TodoComponent } from './components/todolists/todolist/todo/todo.component';


@NgModule({
  declarations: [
    TodoListsComponent,
    TodoComponent
  ],
  imports: [
    CommonModule,
    TodosRoutingModule
  ]
})
export class TodosModule { }
