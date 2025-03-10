import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import * as actions from './todo.actions';
import { catchError, map, withLatestFrom } from 'rxjs/operators';
import { of } from 'rxjs';
import { Todo } from './todo.reducer';
import { getAllTodos } from './todo.selectors';

@Injectable()
export class TodoEffects {

  constructor(
    private readonly actions$: Actions,
    private readonly store: Store,
  ) {}

  getToDoList$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.getTodos),
      map(() => {
        const todos = JSON.parse(localStorage.getItem('todos') || '[]') as Todo[];
        return actions.getTodosSuccess({ todoList: todos });
      }),
      catchError((error) => of(actions.getTodosFailure({ error })))
    )
  );

  addToDoList$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.addTodo),
      withLatestFrom(this.store.pipe(select(getAllTodos))),
      map(([action, todos]) => {
        const updatedTodos = [...todos, action.todo];
        localStorage.setItem('todos', JSON.stringify(updatedTodos));
        return actions.addTodoSuccess({ todo: action.todo });
      }),
      catchError((error) => of(actions.addTodoFailure({ error })))
    )
  );

  changeTodoName$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.changeTodoName),
      withLatestFrom(this.store.pipe(select(getAllTodos))),
      map(([action, todos]) => {
        const updatedTodos = todos.map(todo =>
          todo.id === action.todo.id ? { ...todo, name: action.todo.name } : todo
        );
        localStorage.setItem('todos', JSON.stringify(updatedTodos));
        return actions.changeTodoNameSuccess({ todo: action.todo });
      }),
      catchError((error) => of(actions.changeTodoNameFailure({ error })))
    )
  );

  changeTodoPriority$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.changeTodoPriority),
      withLatestFrom(this.store.pipe(select(getAllTodos))),
      map(([action, todos]) => {
        const updatedTodos = todos.map(todo =>
          todo.id === action.todo.id ? { ...todo, priority: action.todo.priority } : todo
        );
        localStorage.setItem('todos', JSON.stringify(updatedTodos));
        return actions.changeTodoPrioritySuccess({ todo: action.todo });
      }),
      catchError((error) => of(actions.changeTodoPriorityFailure({ error })))
    )
  );

  changeTodoStatus$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.changeTodoStatus),
      withLatestFrom(this.store.pipe(select(getAllTodos))),
      map(([action, todos]) => {
        const updatedTodos = todos.map(todo =>
          todo.id === action.todo.id ? { ...todo, status: action.todo.status } : todo
        );
        localStorage.setItem('todos', JSON.stringify(updatedTodos));
        return actions.changeTodoStatusSuccess({ todo: action.todo });
      }),
      catchError((error) => of(actions.changeTodoStatusFailure({ error })))
    )
  );

  removeTodo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.removeTodo),
      withLatestFrom(this.store.pipe(select(getAllTodos))),
      map(([action, todos]) => {
        const updatedTodos = todos.filter(todo => todo.id !== action.id);
        localStorage.setItem('todos', JSON.stringify(updatedTodos));
        return actions.removeTodoSuccess({ id: action.id });
      }),
      catchError((error) => of(actions.removeTodoFailure({ error })))
    )
  );
}