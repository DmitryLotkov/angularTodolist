import {Component, EventEmitter, Input, Output} from '@angular/core';
import {TFilterType} from "../../../todolist.model";

@Component({
    selector: 'app-todo-filter',
    templateUrl: './todolist-filter.component.html',
    styleUrls: ['./todolist-filter.component.scss'],
    standalone: false
})
export class TodolistFilterComponent {

  @Input() filter!: TFilterType;
  @Output() changeFilterEvent = new EventEmitter<TFilterType>()

  changeFilterHandler(filter: TFilterType) {
    this.changeFilterEvent.emit(filter)
  }
}
