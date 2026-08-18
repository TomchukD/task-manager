import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  http = inject(HttpClient);
  login(params: { user: string, password: string }) {
    return this.http.post('/api/test/auth', params);
  }
}
