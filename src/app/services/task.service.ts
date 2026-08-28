import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Task, User } from '../shared/item.interface';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  http = inject(HttpClient);

  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>('/api/test/tasks');
  }

  getTaskById(taskId: number): Observable<Task> {
    return this.http.get<Task>(`/api/test/tasks/${taskId}`);
  }

  getUsers(): Observable<User> {
    return this.http.get<User>('/api/test/users');
  }
}
