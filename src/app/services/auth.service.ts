import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  http = inject(HttpClient);
  login(params: { user: string; password: string }): Observable<{token: string, user: string}> {
    return this.http.post<{ token: string; user: string }>('/api/test/auth', params);
  }

  setToken(token: string) {
    localStorage.setItem('token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('token') || null;
  }
}
