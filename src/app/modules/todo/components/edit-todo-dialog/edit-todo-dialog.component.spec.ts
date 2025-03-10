import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { StoreModule } from '@ngrx/store';
import { EditTodoDialogComponent } from './edit-todo-dialog.component';
import { Todo, TodoPriority } from 'src/app/modules/store';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('EditTodoDialogComponent', () => {
  let component: EditTodoDialogComponent;
  let fixture: ComponentFixture<EditTodoDialogComponent>;
  let dialogRef: MatDialogRef<EditTodoDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditTodoDialogComponent],
      imports: [
        MatDialogModule,
        FormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatRadioModule,
        BrowserAnimationsModule,
        StoreModule.forRoot({})
      ],
      providers: [
        { provide: MatDialogRef, useValue: { close: jasmine.createSpy('close') } },
        { provide: MAT_DIALOG_DATA, useValue: { id: 1, name: 'Test Todo', priority: TodoPriority.Medium } }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditTodoDialogComponent);
    component = fixture.componentInstance;
    dialogRef = TestBed.inject(MatDialogRef);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with data', () => {
    expect(component.newName).toBe('Test Todo');
    expect(component.newPriority).toBe(TodoPriority.Medium);
  });

  it('should dispatch actions and close dialog on save', () => {
    component.newName = 'Updated Todo';
    component.newPriority = TodoPriority.High;
    spyOn(component['store'], 'dispatch');

    component.onSave();
    expect(component['store'].dispatch).toHaveBeenCalledTimes(2);
    expect(dialogRef.close).toHaveBeenCalledWith({ name: 'Updated Todo', priority: TodoPriority.High });
  });

  it('should close dialog on cancel', () => {
    component.onCancel();
    expect(dialogRef.close).toHaveBeenCalled();
  });
});