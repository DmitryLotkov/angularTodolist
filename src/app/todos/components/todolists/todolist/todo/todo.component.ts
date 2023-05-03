import {Component, Input} from '@angular/core';
import {ITodoList} from '../../../../todolist.model';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss'],
})
export class TodoComponent {
  @Input() todolist!: ITodoList
}
