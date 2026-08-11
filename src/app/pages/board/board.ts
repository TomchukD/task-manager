import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  CdkDrag,
  CdkDragDrop,
  CdkDropList,
  CdkDropListGroup,
  moveItemInArray,
  transferArrayItem
} from '@angular/cdk/drag-drop';

interface Item {
  id: number;
  name: string;
}

@Component({
  selector: 'tm-board',
  imports: [FormsModule, CdkDropListGroup, CdkDrag, CdkDropList],
  templateUrl: './board.html',
  styleUrl: './board.scss',
})
export class Board {
  available: Item[] = [
    { id: 1, name: 'Product 1' },
    { id: 2, name: 'Product 2' },
    { id: 3, name: 'Product 3' },
    { id: 4, name: 'Product 4' },
  ];

  selected: Item[] = [
    { id: 5, name: 'Product 5' },
    { id: 6, name: 'Product 6' },
  ];

  assigned: Item[] = [
    { id: 7, name: 'Product 7' },
    { id: 8, name: 'Product 8' },
  ];

  selectedAvailable: Item[] = [];
  selectedItems: Item[] = [];
  assignedItems: Item[] = [];
  ngOnInit() {}

  drop(event: CdkDragDrop<Item[]>): void {
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
