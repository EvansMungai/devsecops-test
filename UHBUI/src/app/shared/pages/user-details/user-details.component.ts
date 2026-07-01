
import { Component, OnInit, signal } from '@angular/core';

import { ChangePasswordComponent } from "../change-password/change-password.component";
import { ButtonComponent } from '../../elements/button/button.component';
import { ActionButton } from '../../../core/interfaces/button.interface';

@Component({
  selector: 'app-user-details',
  imports: [ChangePasswordComponent, ButtonComponent],
  templateUrl: './user-details.component.html',
  styleUrl: './user-details.component.css'
})

export class UserDetailsComponent implements OnInit {
  showChangePasswordForm: boolean = false;
  userData = signal<any | null>(null);
  loadingStyles = 'loading-spinner loading-lg';
  buttonProps: ActionButton = { text: 'Change Password', type: 'button', variant: 'secondary', size: 'sm', action: () => this.toggleChangePasswordForm() }


  ngOnInit(): void {
    const userDetails = localStorage.getItem('user');
    if (userDetails) {
      const parsedUser = JSON.parse(userDetails);
      this.userData.set(parsedUser);
    } else {
      console.warn('No user data found in the local storage');
    }
  }
  toggleChangePasswordForm(): boolean {
    return this.showChangePasswordForm = !this.showChangePasswordForm;
  }
}
