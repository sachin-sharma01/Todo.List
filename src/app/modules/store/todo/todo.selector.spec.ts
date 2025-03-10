import { getTodoState, getAllTodos, getFilteredTodos } from './todo.selectors';
import { TodoState, Todo, TodoPriority, TodoStatus } from './todo.reducer';

describe('Todo Selectors', () => {
  const initialState: TodoState = {
    todoList: [
      { id: 1, name: 'Test Todo 1', priority: TodoPriority.Medium, status: TodoStatus.InProgress },
      { id: 2, name: 'Test Todo 2', priority: TodoPriority.High, status: TodoStatus.Complete }
    ],
    filteredList: [
      { id: 2, name: 'Test Todo 2', priority: TodoPriority.High, status: TodoStatus.Complete }
    ]
  };

  it('should select the feature state', () => {
    const result = getTodoState.projector(initialState);
    expect(result).toEqual(initialState);
  });

  it('should select all todos', () => {
    const result = getAllTodos.projector(initialState);
    expect(result.length).toBe(2);
    expect(result).toEqual(initialState.todoList);
  });

  it('should select filtered todos', () => {
    const result = getFilteredTodos.projector(initialState);
    expect(result.length).toBe(1);
    expect(result).toEqual(initialState.filteredList);
  });
});