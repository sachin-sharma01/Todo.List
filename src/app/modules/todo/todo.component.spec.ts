import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StoreModule, Store } from '@ngrx/store';
import { TodoComponent } from './todo.component';
import { MatTabsModule } from '@angular/material/tabs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { MatRadioModule } from '@angular/material/radio';
import { of } from 'rxjs';
import { Todo, TodoStatus, TodoPriority } from '../store/todo/todo.reducer';
import { getTodos, addTodo, removeTodo, changeTodoStatus, changeTodoName, filterTodos } from '@app/modules/store';

describe('TodoComponent', () => {
  let component: TodoComponent;
  let fixture: ComponentFixture<TodoComponent>;
  let store: Store;
  let dialog: MatDialog;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TodoComponent],
      imports: [
        StoreModule.forRoot({}),
        MatTabsModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        BrowserAnimationsModule,
        ReactiveFormsModule,
        MatIconModule,
        MatSelectModule,
        MatDialogModule,
        MatTableModule,
        MatRadioModule
      ],
      providers: [
        { provide: MatDialog, useValue: { open: () => ({ afterClosed: () => of({}) }) } }
      ]
    }).compileComponents();

    store = TestBed.inject(Store);
    dialog = TestBed.inject(MatDialog);
    fixture = TestBed.createComponent(TodoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch getTodos on init', () => {
    spyOn(store, 'dispatch');
    component.ngOnInit();
    expect(store.dispatch).toHaveBeenCalledWith(getTodos());
  });

  it('should add new todo', () => {
    spyOn(store, 'dispatch');
    component.newTodo.setValue('New Todo');
    component.todoPriority.setValue(TodoPriority.Medium);
    component.addNewTodo();
    expect(store.dispatch).toHaveBeenCalledWith(addTodo({
      todo: {
        id: (jasmine.any(Number) as any),
        name: 'New Todo',
        priority: TodoPriority.Medium,
        status: TodoStatus.InProgress
      }
    }));
  });

  it('should not add new todo if name is empty', () => {
    spyOn(store, 'dispatch');
    component.newTodo.setValue('');
    component.addNewTodo();
    expect(store.dispatch).not.toHaveBeenCalled();
  });

  it('should change todo name', () => {
    spyOn(store, 'dispatch');
    const todo: Todo = { id: 1, name: 'Test Todo', priority: TodoPriority.Medium, status: TodoStatus.InProgress };
    component.changeTodoName(todo);
    expect(store.dispatch).toHaveBeenCalledWith(changeTodoName({ todo }));
  });

  it('should change todo status', () => {
    spyOn(store, 'dispatch');
    const todo: Todo = { id: 1, name: 'Test Todo', priority: TodoPriority.Medium, status: TodoStatus.InProgress };
    component.changeTodoStatus(todo);
    expect(store.dispatch).toHaveBeenCalledWith(changeTodoStatus({ todo: { ...todo } }));
  });

  it('should remove todo', () => {
    spyOn(store, 'dispatch');
    const todo: Todo = { id: 1, name: 'Test Todo', priority: TodoPriority.Medium, status: TodoStatus.InProgress };
    component.removeTodo(todo);
    expect(store.dispatch).toHaveBeenCalledWith(removeTodo({ id: todo.id }));
  });

  it('should filter todos by status', () => {
    spyOn(store, 'dispatch');
    component.filterTodos(TodoStatus.Complete);
    expect(store.dispatch).toHaveBeenCalledWith(filterTodos({ status: TodoStatus.Complete }));
  });

  it('should select tab and filter todos', () => {
    spyOn(store, 'dispatch');
    component.selectTab(1);
    expect(component.selectedTab).toBe('in-progress');
    expect(store.dispatch).toHaveBeenCalledWith(filterTodos({ status: TodoStatus.InProgress }));
  });

  it('should select tab and filter todos', () => {
    spyOn(store, 'dispatch');
    component.selectTab(2);
    expect(component.selectedTab).toBe('completed');
    expect(store.dispatch).toHaveBeenCalledWith(filterTodos({ status: TodoStatus.Complete }));
  });

  it('should select tab and show all todos', () => {
    component.selectTab(0);
    expect(component.selectedTab).toBe('all');
  });
});