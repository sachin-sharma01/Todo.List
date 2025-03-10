import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { TodoEffects } from './todo.effects';
import { Actions } from '@ngrx/effects';
import { hot, cold } from 'jasmine-marbles';
import * as actions from './todo.actions';
import { getAllTodos } from './todo.selectors';
import { Todo, TodoPriority, TodoStatus } from './todo.reducer';

const mockTodo: Todo = { id: 1, name: 'Test Todo', status: TodoStatus.InProgress, priority: TodoPriority.High };

// Mock localStorage
class MockLocalStorage {
  private store: { [key: string]: string } = {};

  getItem(key: string): string | null {
    return this.store[key] || null;
  }

  setItem(key: string, value: string): void {
    this.store[key] = value;
  }

  removeItem(key: string): void {
    delete this.store[key];
  }
}

describe('TodoEffects', () => {
  let actions$: Actions;
  let effects: TodoEffects;
  let localStorageMock: MockLocalStorage;

  beforeEach(() => {
    localStorageMock = new MockLocalStorage();
    spyOn(localStorage, 'getItem').and.callFake(localStorageMock.getItem.bind(localStorageMock));
    spyOn(localStorage, 'setItem').and.callFake(localStorageMock.setItem.bind(localStorageMock));
    spyOn(localStorage, 'removeItem').and.callFake(localStorageMock.removeItem.bind(localStorageMock));

    TestBed.configureTestingModule({
      providers: [
        TodoEffects,
        provideMockActions(() => actions$),
        provideMockStore({
          selectors: [{ selector: getAllTodos, value: [mockTodo] }],
        }),
      ],
    });

    effects = TestBed.inject(TodoEffects);
  });

  it('should dispatch getTodosSuccess when getTodos is triggered', () => {
    localStorageMock.setItem('todos', JSON.stringify([mockTodo]));
    actions$ = hot('-a', { a: actions.getTodos() });
    const expected = cold('-b', { b: actions.getTodosSuccess({ todoList: [mockTodo] }) });
    expect(effects.getToDoList$).toBeObservable(expected);
  });

  it('should dispatch addTodoSuccess when addTodo is triggered', () => {
    actions$ = hot('-a', { a: actions.addTodo({ todo: mockTodo }) });
    const expected = cold('-b', { b: actions.addTodoSuccess({ todo: mockTodo }) });
    expect(effects.addToDoList$).toBeObservable(expected);
  });

  it('should dispatch changeTodoNameSuccess when changeTodoName is triggered', () => {
    const updatedTodo = { ...mockTodo, name: 'Updated Name' };
    actions$ = hot('-a', { a: actions.changeTodoName({ todo: updatedTodo }) });
    const expected = cold('-b', { b: actions.changeTodoNameSuccess({ todo: updatedTodo }) });
    expect(effects.changeTodoName$).toBeObservable(expected);
  });

  it('should dispatch changeTodoPrioritySuccess when changeTodoPriority is triggered', () => {
    const updatedTodo = { ...mockTodo, priority: TodoPriority.Low };
    actions$ = hot('-a', { a: actions.changeTodoPriority({ todo: updatedTodo }) });
    const expected = cold('-b', { b: actions.changeTodoPrioritySuccess({ todo: updatedTodo }) });
    expect(effects.changeTodoPriority$).toBeObservable(expected);
  });

  it('should dispatch changeTodoStatusSuccess when changeTodoStatus is triggered', () => {
    const updatedTodo = { ...mockTodo, priority: TodoPriority.Low };
    actions$ = hot('-a', { a: actions.changeTodoStatus({ todo: updatedTodo }) });
    const expected = cold('-b', { b: actions.changeTodoStatusSuccess({ todo: updatedTodo }) });
    expect(effects.changeTodoStatus$).toBeObservable(expected);
  });

  it('should dispatch removeTodoSuccess when removeTodo is triggered', () => {
    actions$ = hot('-a', { a: actions.removeTodo({ id: 1 }) });
    const expected = cold('-b', { b: actions.removeTodoSuccess({ id: 1 }) });
    expect(effects.removeTodo$).toBeObservable(expected);
  });
});