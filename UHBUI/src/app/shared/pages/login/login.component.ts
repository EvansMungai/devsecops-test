import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

import { SubmitButton } from '../../../core/interfaces/button.interface';
import { ButtonComponent } from '../../elements/button/button.component';
import { ToastComponent } from '../../elements/toast/toast.component';
import { UserService } from '../../../core/services/user.service';
import { AuthService } from '../../../core/services/auth.service';
import { showToast } from '../../utils/toastUtils';
import { extractErrorMessage } from '../../utils/errorHandling';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, ButtonComponent, ToastComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  private fb = inject(FormBuilder);
  private userService = inject(UserService);
  private authService = inject(AuthService);
  private router = inject(Router);

  loginForm = this.fb.group({
    userName: ['', Validators.required],
    password: ['', Validators.required]
  })
  submitButtonProps: SubmitButton = {
    text: 'Submit',
    type: 'submit',
    size: 'lg',
    variant: 'secondary',
    formId: 'loginForm'
  };
  toastVisible = signal(false);
  toastStyles = signal('');
  alertStyles = signal('');
  alertMessage = signal('');

  onSubmit(): void {
    this.authService.login(this.loginForm.value).subscribe({
      next: data => {
        showToast('Welcome Back.', 'alert-success', this.toastVisible, this.toastStyles, this.alertStyles, this.alertMessage);
        this.authService.setToken(data.token);
        this.authService.setUser(data.user);
        this.redirectBasedOnRole(data.user.roles[0]);
      },
      error: err => {
        const errorMessage = extractErrorMessage(err);
        showToast(errorMessage, 'alert-error', this.toastVisible, this.toastStyles, this.alertStyles, this.alertMessage);
      }
    })
  }
  redirectBasedOnRole(role: string) {
    switch (role) {
      case 'Student':
        this.router.navigate(['/uhb/student']);
        break;
      case 'Admin':
        this.router.navigate(['/uhb/admin']);
        break;
      case 'Housekeeper':
        this.router.navigate(['/uhb/housekeeper']);
        break;
      case 'Matron':
        this.router.navigate(['/uhb/matron']);
        break;
      default:
        this.router.navigate(['/access-denied']);
        break;
    }
  }
}
