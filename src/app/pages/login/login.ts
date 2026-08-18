import { Component, inject } from '@angular/core';
import { InputText } from 'primeng/inputtext';
import { Password } from 'primeng/password';
import { Button } from 'primeng/button';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [InputText, Password, Button, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  authService = inject(AuthService);
  route = inject(Router);
  private fb = inject(FormBuilder).nonNullable;

  loginForm = this.fb.group({
    user: ['dmitry', [Validators.required]],
    password: ['task', Validators.required],
  });

  onSubmitForm(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }
    this.authService.login(this.loginForm.getRawValue())
      .subscribe(auth => {
        this.authService.setToken(auth.token);
        this.route.navigate(['/task-manager/board'])
          .then();
      });
  }
}
