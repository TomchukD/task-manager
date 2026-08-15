import { Component } from '@angular/core';
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

@Component({
  selector: 'tm-board',
  imports: [FormsModule, CdkDropListGroup, CdkDrag, CdkDropList, TaskCard],
  templateUrl: './board.html',
  styleUrl: './board.scss',
})
export class Board {
  available: Task[] = [
    {
      id: 1,
      title: 'Implement drag and drop',
      description: 'Add task drag and drop between columns',
      status: 'todo',
      priority: 'high',
      assignee: 'John Doe',
      deadline: '2026-08-20',
      createdAt: '2026-08-15',
    },
    {
      id: 2,
      title: 'Fix login validation',
      description: 'Fix validation errors on the login form',
      status: 'in-progress',
      priority: 'medium',
      assignee: 'Jane Smith',
      deadline: '2026-08-18',
      createdAt: '2026-08-14',
    },
    {
      id: 3,
      title: 'Update documentation',
      description: 'Update API and project setup documentation',
      status: 'done',
      priority: 'low',
      assignee: 'Alex Johnson',
      deadline: '2026-08-16',
      createdAt: '2026-08-10',
    },
  ];

  selected: Task[] = [];

  assigned: Task[] = [];

  selectedAvailable: Task[] = [];
  selectedItems: Task[] = [];
  assignedItems: Task[] = [];
  ngOnInit() {}

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
