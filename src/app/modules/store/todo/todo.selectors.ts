import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TodoState, TODO_FEATURE_KEY, TodoStatus } from './todo.reducer';

export const getTodoState = createFeatureSelector<TodoState>(TODO_FEATURE_KEY);

export const getAllTodos = createSelector(getTodoState, (state) => state ? state.todoList : []);

export const getFilteredTodos = createSelector(
    getTodoState,
    (state: TodoState) => state ? state.filteredList : []
  );