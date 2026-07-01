import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ButtonComponent } from '../../../shared/elements/button/button.component';
import { SubmitButton } from '../../../core/interfaces/button.interface';
import { ToastComponent } from '../../../shared/elements/toast/toast.component';
import { showToast} from '../../../shared/utils/toastUtils';
import { StudentService } from '../../../core/services/student.service';

@Component({
  selector: 'app-register-student-details',
  imports: [CommonModule, ReactiveFormsModule, ButtonComponent, ToastComponent],
  templateUrl: './register-student-details.component.html',
  styleUrl: './register-student-details.component.css'
})
export class RegisterStudentDetailsComponent {
  private fb = inject(FormBuilder);
  private studentService = inject(StudentService);

  studentProfileForm: FormGroup = this.fb.group({
    regNo: ['', [Validators.required, Validators.pattern('^[A-Z]\\d{3}-\\d{2}-\\d{4}/\\d{4}$')]],
    surname: ['', Validators.required],
    firstName: ['', Validators.required],
    secondName: ['', Validators.required],
    gender: ['', Validators.required]
  });
  submitButtonProps: SubmitButton = {
    text: 'Submit', type: 'submit', variant: "secondary", formId: 'studentRegistrationForm'
  }
  toastVisible = signal(false);
  toastStyles = signal('');
  alertStyles = signal('');
  alertMessage = signal('');

  onSubmit(): void {
    if (this.studentProfileForm.valid) {
      this.studentService.createStudentDetails(this.studentProfileForm.value).subscribe({
        next: () => showToast('Your form was submitted successfully!', 'alert-success', this.toastVisible, this.toastStyles, this.alertStyles, this.alertMessage),
        error: err => console.error('Error registering student details: ', err)
      })
    } else {
      console.log('Form is invalid');
      showToast('Your form was not submitted!', 'alert-error', this.toastVisible, this.toastStyles, this.alertStyles, this.alertMessage);
    }
  }
}
