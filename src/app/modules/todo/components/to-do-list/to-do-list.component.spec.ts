import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { StoreModule } from '@ngrx/store';
import { TodoListComponent } from './to-do-list.component';
import { Todo, TodoStatus, TodoPriority } from 'src/app/modules/store';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { of } from 'rxjs';
import { SortTodosPipe } from '../../pipes/sort-todos.pipe';

describe('TodoListComponent', () => {
  let component: TodoListComponent;
  let fixture: ComponentFixture<TodoListComponent>;
  let dialog: MatDialog;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TodoListComponent, SortTodosPipe],
      imports: [
        BrowserAnimationsModule,
        MatDialogModule,
        MatTableModule,
        MatButtonModule,
        MatIconModule,
        StoreModule.forRoot({})
      ],
      providers: [
        { provide: MatDialog, useValue: { open: () => ({ afterClosed: () => of({}) }) } }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoListComponent);
    component = fixture.componentInstance;
    dialog = TestBed.inject(MatDialog);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit changeStatus event with complete status', () => {
    const todo: Todo = { id: 1, name: 'Test Todo', priority: TodoPriority.Medium, status: TodoStatus.InProgress };
    spyOn(component.changeStatus, 'emit');
    component.onComplete(todo);
    expect(component.changeStatus.emit).toHaveBeenCalledWith({ ...todo, status: TodoStatus.Complete });
  });

  it('should open edit dialog and update editedName and editedPriority on dialog close', () => {
    const todo: Todo = { id: 1, name: 'Test Todo', priority: TodoPriority.Medium, status: TodoStatus.InProgress };
    const dialogRefSpyObj = jasmine.createSpyObj({ afterClosed: of({ name: 'Updated Todo', priority: TodoPriority.High }) });
    spyOn(dialog, 'open').and.returnValue(dialogRefSpyObj);

    component.onEdit(todo);
    expect(dialog.open).toHaveBeenCalled();
    expect(dialogRefSpyObj.afterClosed).toHaveBeenCalled();
    expect(component.editedName[todo.id]).toBe('Updated Todo');
    expect(component.editedPriority[todo.id]).toBe(TodoPriority.High);
  });

  it('should emit remove event', () => {
    const todo: Todo = { id: 1, name: 'Test Todo', priority: TodoPriority.Medium, status: TodoStatus.InProgress };
    spyOn(component.remove, 'emit');
    component.onRemove(todo);
    expect(component.remove.emit).toHaveBeenCalledWith(todo);
  });

  it('should set editMode to false if dialog result is undefined', () => {
    const todo: Todo = { id: 1, name: 'Test Todo', priority: TodoPriority.Medium, status: TodoStatus.InProgress };
    const dialogRefSpyObj = jasmine.createSpyObj({ afterClosed: of(undefined) });
    spyOn(dialog, 'open').and.returnValue(dialogRefSpyObj);

    component.onEdit(todo);
    expect(dialog.open).toHaveBeenCalled();
    expect(dialogRefSpyObj.afterClosed).toHaveBeenCalled();
    expect(component.editMode[todo.id]).toBe(false);
  });
});