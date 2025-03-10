import * as TodoActions from './todo.actions';
import { Todo, TodoPriority, TodoStatus } from '@app/modules/store';

describe('Todo Actions', () => {
  it('should create getTodos action', () => {
    const action = TodoActions.getTodos();
    expect(action.type).toBe('[Todo] Get Todos');
  });

  it('should create addTodo action', () => {
    const todo: Todo = { id: 1, name: 'Test Todo', priority: TodoPriority.Medium, status: TodoStatus.InProgress };
    const action = TodoActions.addTodo({ todo });
    expect(action.type).toBe('[Todo] Add Todo');
    expect(action.todo).toEqual(todo);
  });

  it('should create removeTodo action', () => {
    const id = 1;
    const action = TodoActions.removeTodo({ id });
    expect(action.type).toBe('[Todo] Remove Todo');
    expect(action.id).toBe(id);
  });

  it('should create changeTodoStatus action', () => {
    const todo: Todo = { id: 1, name: 'Test Todo', priority: TodoPriority.Medium, status: TodoStatus.Complete };
    const action = TodoActions.changeTodoStatus({ todo });
    expect(action.type).toBe('[Todo] Change Todo Status');
    expect(action.todo).toEqual(todo);
  });

  it('should create changeTodoName action', () => {
    const todo: Todo = { id: 1, name: 'Updated Todo', priority: TodoPriority.Medium, status: TodoStatus.InProgress };
    const action = TodoActions.changeTodoName({ todo });
    expect(action.type).toBe('[Todo] Change Todo Name');
    expect(action.todo).toEqual(todo);
  });

  it('should create filterTodos action', () => {
    const status = TodoStatus.Complete;
    const action = TodoActions.filterTodos({ status });
    expect(action.type).toBe('[Todo] Filter Todos');
    expect(action.status).toBe(status);
  });
});