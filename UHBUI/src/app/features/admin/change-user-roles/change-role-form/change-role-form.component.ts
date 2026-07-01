import { Component, inject, Input, OnInit, signal } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ButtonComponent } from '../../../../shared/elements/button/button.component';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SubmitButton } from '../../../../core/interfaces/button.interface';
import { ToastComponent } from '../../../../shared/elements/toast/toast.component';
import { showToast } from '../../../../shared/utils/toastUtils';
import { UserService } from '../../../../core/services/user.service';
import { LoadingComponent } from '../../../../shared/elements/loading/loading.component';

@Component({
  selector: 'change-role-form',
  imports: [RouterModule, ReactiveFormsModule, ButtonComponent, ToastComponent, LoadingComponent],
  templateUrl: './change-role-form.component.html',
  styleUrl: './change-role-form.component.css'
})
export class ChangeRoleFormComponent implements OnInit {
  private fb = inject(FormBuilder);
  private userService = inject(UserService);
  @Input() username = '';

  changeUserRoleForm: FormGroup = this.fb.group({
    role: ['', Validators.required]
  });
  submitButtonProps: SubmitButton = {
    text: 'Assign Role', type: 'submit', variant: 'secondary', formId: 'changeRoleForm'
  };
  rolesData = signal<any | null>(null);
  toastVisible = signal(false);
  toastStyles = signal('');
  alertStyles = signal('');
  alertMessage = signal('');
  loadingStyles: string = 'loading-spinner loading-sm';

  ngOnInit(): void {
    this.userService.getRoles().subscribe({
      next: data => this.rolesData.set(data),
      error: err => console.error("Error retrieving user details: ", err)
    })
  }

  onSubmit(): void {
    if (this.changeUserRoleForm.valid) {
      const formData = this.changeUserRoleForm.value;
      formData.username = this.username;
      this.userService.assignRoleToUser(formData.username, formData.role).subscribe({
        next: () => showToast('Role successfully allocated to the user! 🎉  ', 'alert-success', this.toastVisible, this.toastStyles, this.alertStyles, this.alertMessage),
        error: err => showToast(`An error occurred: ${err}`, 'alert-error', this.toastVisible, this.toastStyles, this.alertStyles, this.alertMessage)
      })
      
    } else {
      console.log("Form invalid");
      showToast('Role successfully allocated to the user! 🎉  ', 'alert-success', this.toastVisible, this.toastStyles, this.alertStyles, this.alertMessage);
    }
  }
}
