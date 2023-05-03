import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {TodoListsComponent} from './components/todolists/todo-lists.component';

const routes: Routes = [
  {path: "", component: TodoListsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TodosRoutingModule { }
