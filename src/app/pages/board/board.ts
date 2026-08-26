import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  CdkDrag,
  CdkDragDrop,
  CdkDropList,
  CdkDropListGroup,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { TaskCard } from 'src/app/components/task-card/task-card';
import { Task } from 'src/app/shared/item.interface';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'tm-board',
  imports: [FormsModule, CdkDropListGroup, CdkDrag, CdkDropList, TaskCard],
  templateUrl: './board.html',
  styleUrl: './board.scss',
})
export class Board {
  private readonly route = inject(ActivatedRoute);

  todo: Task[] = [];
  inProgress: Task[] = [];
  done: Task[] = [];

  ngOnInit(): void {
    const tasks = this.route.snapshot.data['tasks'] as Task[];

    tasks.forEach((task) => {
      switch (task.status) {
        case 'todo':
          this.todo.push(task);
          break;
        case 'in-progress':
          this.inProgress.push(task);
          break;
        case 'done':
          this.done.push(task);
          break;
      }
    });
  }

  drop(event: CdkDragDrop<Task[]>): void {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }
}
