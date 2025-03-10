import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { getTodos, addTodo, removeTodo, changeTodoStatus, changeTodoName, filterTodos } from '@app/modules/store';
import { select, Store } from '@ngrx/store';
import { getAllTodos, getFilteredTodos } from '@app/modules/store';

import { FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { TodoStatus,Todo, TodoPriority } from '@app/modules/store';
@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {
  statusEnum = TodoStatus;
  selectedTab: string = 'all';
  priorities : TodoPriority[] = [TodoPriority.Low, TodoPriority.Medium, TodoPriority.High];
  newTodo = new FormControl('', [Validators.required]);
  todoPriority = new FormControl('', [Validators.required]);

  allTodos$: Observable<Todo[]> = this.store.pipe(select(getAllTodos));
  filteredTodos$: Observable<Todo[]> = this.store.pipe(select(getFilteredTodos));

  constructor(
    private store: Store,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.store.dispatch(getTodos());
  }
  
  addNewTodo() {
    if (!this.newTodo.value) return;
    const newTodo: Todo = { 
      id: Math.floor(Math.random() * 10000), 
      priority: this.todoPriority.value as TodoPriority, 
      name: this.newTodo.value,
      status: TodoStatus.InProgress
    };
    this.store.dispatch(addTodo({ todo: newTodo }));
    this.newTodo.reset();
    this.todoPriority.reset();
  }

  changeTodoName(todo: Todo) {
    this.store.dispatch(changeTodoName({ todo }));
  }

  changeTodoStatus(todo: Todo) {
    this.store.dispatch(changeTodoStatus({ todo: { ...todo } }));
  }

  removeTodo(todo: Todo) {
    this.store.dispatch(removeTodo({ id: todo.id }));
  }

  filterTodos(status: TodoStatus) {
    this.store.dispatch(filterTodos({ status }));
  }

  selectTab(index: number) {
    if (index === 0) {
      this.selectedTab = 'all';
    } else if (index === 1) {
      this.selectedTab = 'in-progress';
      this.store.dispatch(filterTodos({ status: TodoStatus.InProgress }));
    } else if (index === 2) {
      this.selectedTab = 'completed';
      this.store.dispatch(filterTodos({ status: TodoStatus.Complete }));
    }
  }
}