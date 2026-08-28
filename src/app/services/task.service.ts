import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Task, User } from '../shared/item.interface';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  http = inject(HttpClient);
  authService = inject(AuthService);

  getTasks(): Observable<Task[]> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });
    return this.http.get<Task[]>('/api/test/tasks', { headers });
  }

  getTaskById(taskId: number): Observable<Task> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });
    return this.http.get<Task>(`/api/test/tasks/${taskId}`, { headers });
  }

  getUsers(): Observable<User> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });
    return this.http.get<User>(`/api/test/users`, { headers });
  }
}
