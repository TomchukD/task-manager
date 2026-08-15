import { Component } from '@angular/core';
import { InputText } from 'primeng/inputtext';
import { Textarea } from 'primeng/textarea';
import { Button } from 'primeng/button';
import { Select } from 'primeng/select';
import { DatePicker } from 'primeng/datepicker';

@Component({
  selector: 'tm-task-form',
  imports: [InputText, Textarea, Button, Select, DatePicker],
  templateUrl: './task-form.html',
  styleUrl: './task-form.scss',
})
export class TaskForm {}
