import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { changeTodoName, changeTodoPriority, Todo, TodoPriority } from '@app/modules/store';

@Component({
  selector: 'app-edit-todo-dialog',
  templateUrl: './edit-todo-dialog.component.html',
  styleUrls: ['./edit-todo-dialog.component.css']
})
export class EditTodoDialogComponent implements OnInit {
  newName: string = '';
  newPriority: TodoPriority | undefined;
  constructor(public dialogRef: MatDialogRef<EditTodoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Todo,
    private store: Store) {}

  ngOnInit(): void {
    this.newName = this.data.name;
    this.newPriority = this.data.priority;
  }

  onSave(): void {
        this.store.dispatch(changeTodoName({ todo: { ...this.data, name: this.newName } }));
        this.store.dispatch(changeTodoPriority({ todo: { ...this.data, priority: this.newPriority as TodoPriority } }));
      this.dialogRef.close({ name: this.newName, priority: this.newPriority });
  }

  onCancel(): void {
    this.dialogRef.close();
  }

}
