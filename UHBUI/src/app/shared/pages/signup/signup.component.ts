import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

import { ButtonComponent } from '../../elements/button/button.component';
import { ToastComponent } from '../../elements/toast/toast.component';
import { SubmitButton } from '../../../core/interfaces/button.interface';
import { UserService } from '../../../core/services/user.service';
import { showToast } from '../../utils/toastUtils';
import { extractErrorMessage } from '../../utils/errorHandling';

@Component({
  selector: 'app-signup',
  imports: [ReactiveFormsModule, ButtonComponent, ToastComponent],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  private fb = inject(FormBuilder);
  private userService = inject(UserService);

  signupForm = this.fb.group({
    userName: ['', Validators.required],
    password: ['', Validators.required]
  })
  platform: string = '';
  submitButtonProps: SubmitButton = {
    text: 'Submit',
    type: 'submit',
    size: 'lg',
    variant: 'secondary',
    formId: 'signupForm'
  };
  toastVisible = signal(false);
  toastStyles = signal('');
  alertStyles = signal('');
  alertMessage = signal('');

  onSubmit(): void {
    this.userService.createUser(this.signupForm.value, ).subscribe({
      next: () => showToast("User created successfully.", 'alert-success', this.toastVisible,this.toastStyles, this.alertStyles, this.alertMessage),
      error: err => {
        const errorMessage = extractErrorMessage(err);
        showToast(errorMessage, 'alert-error', this.toastVisible, this.toastStyles, this.alertStyles, this.alertMessage);
      }
    })
  }
}
