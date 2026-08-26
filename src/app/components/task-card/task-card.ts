import { Component, Input } from '@angular/core';
import { Task } from 'src/app/shared/item.interface';
import { Card } from 'primeng/card';
import { Tag } from 'primeng/tag';
import { Avatar } from 'primeng/avatar';
import { InitialsPipe } from 'src/app/shared/pipes/initials.pipe';

@Component({
  selector: 'tm-task-card',
  imports: [Card, Tag, Avatar, InitialsPipe],
  templateUrl: './task-card.html',
  styleUrl: './task-card.scss',
})
export class TaskCard {
  @Input() data?: Task;
}
