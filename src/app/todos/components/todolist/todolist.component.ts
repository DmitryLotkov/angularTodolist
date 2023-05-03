import {Component, OnInit} from '@angular/core';
import {TodolistService} from '../../services/todolist.service';
import {Observable} from 'rxjs';
import {ITodoList} from '../../todolist.model';


@Component({
  selector: 'app-todolist',
  templateUrl: './todolist.component.html',
  styleUrls: ['./todolist.component.scss'],
})
export class TodolistComponent implements OnInit {
  todos$!: Observable<ITodoList[]>
constructor(private todolistService: TodolistService) {
}
  ngOnInit() {
    this.todolistService.getTodos()
    this.todos$ = this.todolistService.todoLists$
  }
}
