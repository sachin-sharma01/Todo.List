import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Store } from '@ngrx/store';
import { MatDialog } from '@angular/material/dialog';
import { EditTodoDialogComponent } from '../edit-todo-dialog/edit-todo-dialog.component';
import { Todo, TodoStatus, TodoPriority } from '@app/modules/store';

@Component({
  selector: 'app-todo-list',
  templateUrl: './to-do-list.component.html',
  styleUrls: ['./to-do-list.component.css']
})
export class TodoListComponent {
  @Input() todos: Todo[] | null = [];
  @Output() changeStatus = new EventEmitter<Todo>();
  @Output() changeName = new EventEmitter<Todo>();
  @Output() remove = new EventEmitter<Todo>();

  editMode: { [id: number]: boolean } = {};
  editedName: { [id: number]: string } = {};
  editedPriority: { [id: number]: TodoPriority | undefined } = {};
  priorities = Object.values(TodoPriority);
  displayedColumns: string[] = ['name', 'priority', 'actions'];
  constructor(private store: Store, public dialog: MatDialog) { }

  onComplete(todo: Todo) {
    const newStatus = TodoStatus.Complete;
    this.changeStatus.emit({ ...todo, status: newStatus });
  }

  onEdit(todo: Todo) {
    this.openEditDialog(todo);
  }

  onRemove(todo: Todo) {
    this.remove.emit(todo);
  }

  openEditDialog(todo: Todo): void {
    const dialogRef = this.dialog.open(EditTodoDialogComponent, {
      width: '250px',
      data: todo
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.editedName[todo.id] = result.name;
        this.editedPriority[todo.id] = result.priority;
      } else {
        this.editMode[todo.id] = false;
      }
    });
  }
}