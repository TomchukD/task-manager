import { Component, inject } from '@angular/core';
import { InputText } from 'primeng/inputtext';
import { Password } from 'primeng/password';
import { Button } from 'primeng/button';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  imports: [InputText, Password, Button, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  authService = inject(AuthService);
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
        console.log(auth);
      });
  }
}
