import { todoReducer, initialState, TodoState, Todo, TodoPriority, TodoStatus } from './todo.reducer';
import * as TodoActions from './todo.actions';

describe('Todo Reducer', () => {
  const mockTodo: Todo = { id: 1, name: 'Test Todo', priority: TodoPriority.Medium, status: TodoStatus.InProgress };

  it('should return the initial state', () => {
    const action = { type: 'Unknown' } as any;
    const state = todoReducer(undefined, action);
    expect(state).toBe(initialState);
  });

  it('should handle getTodosSuccess', () => {
    const todoList: Todo[] = [mockTodo];
    const action = TodoActions.getTodosSuccess({ todoList });
    const state = todoReducer(initialState, action);
    expect(state.todoList).toEqual(todoList);
    expect(state.filteredList).toEqual(todoList);
  });

  it('should handle addTodoSuccess', () => {
    const action = TodoActions.addTodoSuccess({ todo: mockTodo });
    const state = todoReducer(initialState, action);
    expect(state.todoList).toContain(mockTodo);
    expect(state.filteredList).toContain(mockTodo);
  });

  it('should handle changeTodoName', () => {
    const updatedTodo = { ...mockTodo, name: 'Updated Todo' };
    const action = TodoActions.changeTodoName({ todo: updatedTodo });
    const state = todoReducer({ ...initialState, todoList: [mockTodo], filteredList: [mockTodo] }, action);
    expect(state.todoList[0].name).toBe('Updated Todo');
    expect(state.filteredList[0].name).toBe('Updated Todo');
  });

  it('should handle changeTodoStatus', () => {
    const updatedTodo = { ...mockTodo, status: TodoStatus.Complete };
    const action = TodoActions.changeTodoStatus({ todo: updatedTodo });
    const state = todoReducer({ ...initialState, todoList: [mockTodo], filteredList: [mockTodo] }, action);
    expect(state.todoList[0].status).toBe(TodoStatus.Complete);
    expect(state.filteredList[0].status).toBe(TodoStatus.Complete);
  });

  it('should handle removeTodoSuccess', () => {
    const action = TodoActions.removeTodoSuccess({ id: mockTodo.id });
    const state = todoReducer({ ...initialState, todoList: [mockTodo], filteredList: [mockTodo] }, action);
    expect(state.todoList.length).toBe(0);
    expect(state.filteredList.length).toBe(0);
  });

  it('should handle filterTodos', () => {
    const action = TodoActions.filterTodos({ status: TodoStatus.Complete });
    const state = todoReducer({ ...initialState, todoList: [mockTodo], filteredList: [mockTodo] }, action);
    expect(state.filteredList.length).toBe(0);
  });

  it('should handle changeTodoPrioritySuccess', () => {
    const updatedTodo = { ...mockTodo, priority: TodoPriority.High };
    const action = TodoActions.changeTodoPrioritySuccess({ todo: updatedTodo });
    const state = todoReducer({ ...initialState, todoList: [mockTodo], filteredList: [mockTodo] }, action);
    expect(state.todoList[0].priority).toBe(TodoPriority.High);
    expect(state.filteredList[0].priority).toBe(TodoPriority.High);
  });
});