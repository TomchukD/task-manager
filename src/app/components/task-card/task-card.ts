import { DatePipe } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Task } from 'src/app/shared/item.interface';
import { Avatar } from 'primeng/avatar';
import { InitialsPipe } from 'src/app/shared/pipes/initials.pipe';

@Component({
  selector: 'tm-task-card',
  imports: [Avatar, DatePipe, InitialsPipe],
  templateUrl: './task-card.html',
  styleUrl: './task-card.scss',
})
export class TaskCard {
  @Input() data?: Task;
}
