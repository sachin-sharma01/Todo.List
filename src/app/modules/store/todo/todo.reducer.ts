import { Action, createReducer, on } from '@ngrx/store';
import * as actions from './todo.actions';

export const TODO_FEATURE_KEY = 'todo-store';

export enum TodoStatus {
  Complete = 'COMPLETE',
  InProgress = 'IN_PROGRESS',
}

export enum TodoPriority {
  Low = 'LOW',
  Medium = 'MEDIUM',
  High = 'HIGH',
}
export interface Todo {
  id: number;
  name: string;
  status?: TodoStatus;
  priority: TodoPriority;
}

export interface TodoState {
  todoList: Todo[];
  filteredList: Todo[];
}

export const initialState: TodoState = {
  todoList: [],
  filteredList: []
};

const _todoReducer = createReducer(
  initialState,
  on(actions.getTodosSuccess, (state, { todoList }) => ({
    ...state,
    todoList,
    filteredList: todoList,
  })),
  on(actions.addTodoSuccess, (state, { todo }) => ({
    ...state,
    todoList: [...state.todoList, todo],
    filteredList: [...state.filteredList, todo],
  })),
  on(actions.changeTodoName, (state, { todo }) => ({
    ...state,
    todoList: state.todoList.map(existingTodo => (existingTodo.id === todo.id) ? { ...existingTodo, name: todo.name } : existingTodo),
    filteredList: state.filteredList.map(existingTodo => (existingTodo.id === todo.id) ? { ...existingTodo, name: todo.name } : existingTodo)
  })),
  on(actions.changeTodoStatus, (state, { todo }) => ({
    ...state,
    todoList: state.todoList.map(existingTodo => (existingTodo.id === todo.id) ? { ...existingTodo, status: todo.status } : existingTodo),
    filteredList: state.filteredList.map(existingTodo => (existingTodo.id === todo.id) ? { ...existingTodo, status: todo.status } : existingTodo)
  })),
  on(actions.removeTodoSuccess, (state, { id }) => ({
    ...state,
    todoList: state.todoList.filter(existingTodo => existingTodo.id !== id),
    filteredList: state.filteredList.filter(existingTodo => existingTodo.id !== id)
  })),
  on(actions.filterTodos, (state, { status }) => ({
    ...state,
    filteredList: state.todoList.filter(existingTodo => existingTodo.status === status)
  })),
  on(actions.changeTodoPrioritySuccess, (state, { todo }) => ({
    ...state,
    todoList: state.todoList.map(existingTodo => (existingTodo.id === todo.id) ? { ...existingTodo, priority: todo.priority } : existingTodo),
    filteredList: state.filteredList.map(existingTodo => (existingTodo.id === todo.id) ? { ...existingTodo, priority: todo.priority } : existingTodo)
  })),
);

export function todoReducer(state: TodoState | undefined, action: Action) {
  return _todoReducer(state, action);
}