import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {TodoListsComponent} from './components/todolists/todo-lists.component';
import {AuthGuard} from "../core/guards/auth.guard";

const routes: Routes = [{path: "", component: TodoListsComponent, pathMatch: "full", canActivate: [AuthGuard]}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TodosRoutingModule { }
