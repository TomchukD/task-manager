import { Component, inject } from '@angular/core';
import { InputText } from 'primeng/inputtext';
import { Textarea } from 'primeng/textarea';
import { Button } from 'primeng/button';
import { Select } from 'primeng/select';
import { DatePicker } from 'primeng/datepicker';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'tm-task-form',
  imports: [InputText, Textarea, Button, Select, DatePicker, ReactiveFormsModule],
  templateUrl: './task-form.html',
  styleUrl: './task-form.scss',
})
export class TaskForm {
  private fb = inject(FormBuilder);

  taskForm = this.fb.group({
    title: ['', Validators.required],
    assignee: ['', Validators.required],
    description: [],
    status: ['', Validators.required],
    priority: [],
    deadline: [],
  });
}
