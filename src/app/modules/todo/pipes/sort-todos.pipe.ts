import { Pipe, PipeTransform } from '@angular/core';
import { Todo, TodoPriority } from 'src/app/modules/store';

@Pipe({
  name: 'sortTodos',
  pure: true
})
export class SortTodosPipe implements PipeTransform {
  transform(todos: Todo[] | null): Todo[] {
    const priorityOrder = {
      [TodoPriority.High]: 1,
      [TodoPriority.Medium]: 2,
      [TodoPriority.Low]: 3,
    };

    return todos ? [...todos].sort((a, b) => {
      const aPriority = a.priority !== undefined ? priorityOrder[a.priority] : 4;
      const bPriority = b.priority !== undefined ? priorityOrder[b.priority] : 4;
      return aPriority - bPriority;
    }) : [];
  }
}