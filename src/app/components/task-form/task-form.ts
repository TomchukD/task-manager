import { Component, inject } from '@angular/core';
import { InputText } from 'primeng/inputtext';
import { Textarea } from 'primeng/textarea';
import { Button } from 'primeng/button';
import { Select } from 'primeng/select';
import { DatePicker } from 'primeng/datepicker';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Task } from 'src/app/shared/item.interface';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'tm-task-form',
  imports: [InputText, Textarea, Button, Select, DatePicker, ReactiveFormsModule],
  templateUrl: './task-form.html',
  styleUrl: './task-form.scss',
})
export class TaskForm {
  private fb = inject(FormBuilder);
  private dialogRef = inject(DynamicDialogRef, { optional: true });
  protected config = inject(DynamicDialogConfig);
  private taskService = inject(TaskService);

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

  public assigneeOptions: string[] = [];

  taskForm = this.fb.group({
    title: ['', Validators.required],
    assignee: [''],
    description: [''],
    status: ['todo' as Task['status'], Validators.required],
    priority: ['medium' as Task['priority']],
    deadline: [null as string | null],
  });

  ngOnInit() {
    if (this.config.data.taskId) {
      this.taskSettings();
    }
  }

  private taskSettings(): void {
    this.taskService.getTaskById(this.config.data.taskId).subscribe((task) => {
      this.taskForm.patchValue(task);
    });
  }

  close(): void {
    this.dialogRef?.close();
  }
}
