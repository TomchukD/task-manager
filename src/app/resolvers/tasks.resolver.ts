import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { Observable } from 'rxjs';
import { TaskService } from '../services/task.service';
import { Task } from '../shared/item.interface';

export const tasksResolver: ResolveFn<Task[]> = (): Observable<Task[]> => {
  return inject(TaskService).getTasks();
};
