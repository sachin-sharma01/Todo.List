import { SortTodosPipe } from './sort-todos.pipe';
import { Todo, TodoPriority, TodoStatus } from '@app/modules/store';

describe('SortTodosPipe', () => {
  let pipe: SortTodosPipe;

  beforeEach(() => {
    pipe = new SortTodosPipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should sort todos by name', () => {
    const todos: Todo[] = [
      { id: 1, name: 'B Todo', priority: TodoPriority.Medium, status: TodoStatus.InProgress },
      { id: 2, name: 'A Todo', priority: TodoPriority.High, status: TodoStatus.Complete },
      { id: 3, name: 'C Todo', priority: TodoPriority.Low, status: TodoStatus.InProgress }
    ];
    const sortedTodos = pipe.transform(todos);
    expect(sortedTodos[0].name).toBe('A Todo');
    expect(sortedTodos[1].name).toBe('B Todo');
    expect(sortedTodos[2].name).toBe('C Todo');
  });

  it('should handle empty array', () => {
    const todos: Todo[] = [];
    const sortedTodos = pipe.transform(todos);
    expect(sortedTodos.length).toBe(0);
  });
});