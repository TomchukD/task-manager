import { Component, inject } from '@angular/core';
import { InputText } from 'primeng/inputtext';
import { Textarea } from 'primeng/textarea';
import { Button } from 'primeng/button';
import { Select } from 'primeng/select';
import { DatePicker } from 'primeng/datepicker';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { Task } from 'src/app/shared/item.interface';

@Component({
  selector: 'tm-task-form',
  imports: [InputText, Textarea, Button, Select, DatePicker, ReactiveFormsModule],
  templateUrl: './task-form.html',
  styleUrl: './task-form.scss',
})
export class TaskForm {
  private fb = inject(FormBuilder);
  private dialogRef = inject(DynamicDialogRef, { optional: true });

  readonly statusOptions: { label: string; value: Task['status'] }[] = [
    { label: 'To do', value: 'todo' },
    { label: 'In progress', value: 'in-progress' },
    { label: 'Done', value: 'done' },
  ];

  readonly priorityOptions: { label: string; value: Task['priority'] }[] = [
    { label: 'Low', value: 'low' },
    { label: 'Medium', value: 'medium' },
    { label: 'High', value: 'high' },
  ];

  readonly assigneeOptions = ['Alex Rivera', 'Sam Chen', 'Jordan Blake'];

  taskForm = this.fb.group({
    title: ['', Validators.required],
    assignee: ['', Validators.required],
    description: [''],
    status: ['todo' as Task['status'], Validators.required],
    priority: ['medium' as Task['priority']],
    deadline: [null as Date | null],
  });

  close(): void {
    this.dialogRef?.close();
  }
}
