import { Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  CdkDrag,
  CdkDragDrop,
  CdkDropList,
  CdkDropListGroup,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { TaskCard } from 'src/app/components/task-card/task-card';
import { Task } from 'src/app/shared/item.interface';
import { ActivatedRoute } from '@angular/router';
import { TaskForm } from '../../components/task-form/task-form';
import { DialogService } from 'primeng/dynamicdialog';
import { UserRepo } from '../../shared/user.repo';

@Component({
  selector: 'tm-board',
  imports: [FormsModule, CdkDropListGroup, CdkDrag, CdkDropList, TaskCard],
  templateUrl: './board.html',
  styleUrl: './board.scss',
  providers: [DialogService],
})
export class Board {
  private dialogService = inject(DialogService);
  private userRepo = inject(UserRepo);
  private readonly route = inject(ActivatedRoute);
  todo = signal<Task[]>([]);
  inProgress = signal<Task[]>([]);
  done = signal<Task[]>([]);
  visibleTodo = computed(() => this.filterTasks(this.todo()));
  visibleInProgress = computed(() => this.filterTasks(this.inProgress()));
  visibleDone = computed(() => this.filterTasks(this.done()));
  totalTasks = computed(() => {
    return this.visibleTodo().length + this.visibleInProgress().length + this.visibleDone().length;
  });

  private readonly statusByListId: Record<string, Task['status']> = {
    todo: 'todo',
    in_progress: 'in-progress',
    done: 'done',
  };

  ngOnInit() {
    const tasks = this.route.snapshot.data['tasks'] as Task[];
    this.userRepo.getUsers();

    this.todo.set(tasks.filter((task) => task.status === 'todo'));
    this.inProgress.set(tasks.filter((task) => task.status === 'in-progress'));
    this.done.set(tasks.filter((task) => task.status === 'done'));
  }

  drop(event: CdkDragDrop<Task[]>): void {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
      this.syncList(event.container.id, event.container.data);
      return;
    }

    transferArrayItem(
      event.previousContainer.data,
      event.container.data,
      event.previousIndex,
      event.currentIndex,
    );

    const task = event.container.data[event.currentIndex];
    const status = this.statusByListId[event.container.id];
    if (task && status) {
      task.status = status;
    }

    this.syncList(event.previousContainer.id, event.previousContainer.data);
    this.syncList(event.container.id, event.container.data);
  }

  private filterTasks(tasks: Task[]): Task[] {
    const selectedAssignee = this.userRepo.selectedAssignee();
    return selectedAssignee === 'All'
      ? tasks
      : tasks.filter((task) => task.assignee === selectedAssignee);
  }

  private syncList(listId: string, data: Task[]): void {
    const copy = [...data];
    switch (listId) {
      case 'todo':
        this.todo.set(copy);
        break;
      case 'in_progress':
        this.inProgress.set(copy);
        break;
      case 'done':
        this.done.set(copy);
        break;
    }
  }

  public openTask(taskId: number): void {
    this.dialogService.open(TaskForm, {
      data: {
        taskId,
      },
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
