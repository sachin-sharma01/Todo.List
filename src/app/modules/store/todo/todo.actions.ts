import { createAction, props } from '@ngrx/store';
import { Todo, TodoStatus } from './todo.reducer';

export const getTodos = createAction('[Todo] Get Todos');
export const getTodosSuccess = createAction('[Todo] Get Todos Success', props<{ todoList: Todo[] }>());
export const getTodosFailure = createAction('[Todo] Get Todos Failure', props<{ error: any }>());

export const addTodo = createAction('[Todo] Add Todo', props<{ todo: Todo }>());
export const addTodoSuccess = createAction('[Todo] Add Todo Success', props<{ todo: Todo }>());
export const addTodoFailure = createAction('[Todo] Add Todo Failure', props<{ error: any }>());

export const changeTodoName = createAction('[Todo] Change Todo Name', props<{ todo: Todo }>());
export const changeTodoNameSuccess = createAction('[Todo] Change Todo Name Success', props<{ todo: Todo }>());
export const changeTodoNameFailure = createAction('[Todo] Change Todo Name Failure', props<{ error: any }>());

export const changeTodoStatus = createAction('[Todo] Change Todo Status', props<{ todo: Todo }>());
export const changeTodoStatusSuccess = createAction('[Todo] Change Todo Status Success', props<{ todo: Todo }>());
export const changeTodoStatusFailure = createAction('[Todo] Change Todo Status Failure', props<{ error: any }>());

export const changeTodoPriority = createAction('[Todo] Change Todo Priority', props<{ todo: Todo }>());
export const changeTodoPrioritySuccess = createAction('[Todo] Change Todo Priority Success', props<{ todo: Todo }>());
export const changeTodoPriorityFailure = createAction('[Todo] Change Todo Priority Failure', props<{ error: any }>());

export const filterTodos = createAction('[Todo] Filter Todos', props<{ status: TodoStatus }>());
export const filterTodosSuccess = createAction('[Todo] Filter Todos Success', props<{ todoList: Todo[] }>());
export const filterTodosFailure = createAction('[Todo] Filter Todos Failure', props<{ error: any }>());

export const removeTodo = createAction('[Todo] Remove Todo', props<{ id: number }>());
export const removeTodoSuccess = createAction('[Todo] Remove Todo Success', props<{ id: number }>());
export const removeTodoFailure = createAction('[Todo] Remove Todo Failure', props<{ error: any }>());