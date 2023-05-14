import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodolistFilterComponent } from './todolist-filter.component';

describe('TodolistFilterComponent', () => {
  let component: TodolistFilterComponent;
  let fixture: ComponentFixture<TodolistFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TodolistFilterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TodolistFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
