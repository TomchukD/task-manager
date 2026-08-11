import { Component } from '@angular/core';
import { PickListModule } from 'primeng/picklist';

@Component({
  selector: 'tm-column',
  imports: [PickListModule],
  templateUrl: './column.html',
  styleUrl: './column.scss',
})
export class Column {}
