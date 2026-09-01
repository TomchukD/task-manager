import { Component, computed, inject } from '@angular/core';
import { Menubar } from 'primeng/menubar';
import { MenuItem } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { TaskForm } from 'src/app/components/task-form/task-form';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Select } from 'primeng/select';
import { UserRepo } from '../../shared/user.repo';

@Component({
  selector: 'tm-navbar',
  imports: [Menubar, ReactiveFormsModule, Select],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
  providers: [DialogService],
})
export class Navbar {
  private fb = inject(FormBuilder);
  private userRepo = inject(UserRepo);
  private dialogService = inject(DialogService);
  public loading = this.userRepo.loading;
  public items: MenuItem[] = [
    {
      label: 'Home',
      icon: 'pi pi-home',
    },
    {
      label: 'Add Task',
      icon: 'pi pi-star',
      command: () => this.openNewTask(),
    },
  ];

  assigneeOptions = computed(() => ['All', ...this.userRepo.assigneeUser()]);

  assigneeFilter = this.fb.nonNullable.group({
    assignee: this.userRepo.selectedAssignee(),
  });

  constructor() {
    this.assigneeFilter.controls.assignee.valueChanges.subscribe((assignee) => {
      this.userRepo.selectAssignee(assignee);
    });
  }

  private openNewTask(): void {
    this.dialogService.open(TaskForm, {
      showHeader: false,
      modal: true,
      dismissableMask: true,
      styleClass: 'task-form-dialog',
      contentStyle: {
        padding: '0',
        overflow: 'hidden',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
      },
      width: 'min(56rem, 92vw)',
      height: 'min(42rem, 90vh)',
    });
  }
}
