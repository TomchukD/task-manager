import { Component, inject } from '@angular/core';
import { Menubar } from 'primeng/menubar';
import { MenuItem } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { TaskForm } from 'src/app/components/task-form/task-form';

@Component({
  selector: 'tm-navbar',
  imports: [Menubar],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
  providers: [DialogService],
})
export class Navbar {
  private dialogService = inject(DialogService);
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
