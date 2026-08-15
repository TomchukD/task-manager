import { Component, Input } from '@angular/core';
import { Task } from 'src/app/shared/item.interface';
import { Card } from 'primeng/card';
import { Tag } from 'primeng/tag';
import { Avatar } from 'primeng/avatar';

@Component({
  selector: 'tm-task-card',
  imports: [Card, Tag, Avatar],
  templateUrl: './task-card.html',
  styleUrl: './task-card.scss',
})
export class TaskCard {
  @Input() data?: Task;
}
