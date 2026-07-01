import { Component, inject, OnInit, signal } from '@angular/core';
import { ButtonComponent } from '../../../../shared/elements/button/button.component';

import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SubmitButton } from '../../../../core/interfaces/button.interface';
import { ToastComponent } from '../../../../shared/elements/toast/toast.component';
import { RoomService } from '../../../../core/services/room.service';
import { HostelService } from '../../../../core/services/hostel.service';
import { showToast } from '../../../../shared/utils/toastUtils';
import { extractErrorMessage } from '../../../../shared/utils/errorHandling';

@Component({
  selector: 'rooms-registration-form',
  imports: [ReactiveFormsModule, ButtonComponent, ToastComponent],
  templateUrl: './rooms-registration-form.component.html',
  styleUrl: './rooms-registration-form.component.css'
})
export class RoomsRegistrationFormComponent implements OnInit {
  private fb = inject(FormBuilder);
  private roomService = inject(RoomService);
  private hostelService = inject(HostelService);

  registerRoomForm: FormGroup = this.fb.group({
    roomNo: ['', Validators.required],
    hostelNo: ['', Validators.required]
  });
  submitButtonProps: SubmitButton = {
    text: 'Register', type: 'submit', variant: 'secondary', formId: 'registerRoomForm'
  }
  readonly hostelNoDetails = signal<any | null>(null);
  toastVisible = signal(false);
  toastStyles = signal('');
  alertStyles = signal('');
  alertMessage = signal('');

  ngOnInit(): void {
    this.hostelService.getHostelsData().subscribe({
      next: data => this.hostelNoDetails.set(data.map(h => ({
        no: h.hostelNo,
        hostelName : h.hostelName
      }))),
      error: err => console.error('Error fetching hostel details')
    });
  }

  onSubmit(): void {
    if (this.registerRoomForm.valid) {
      const data = this.registerRoomForm.value;
      this.roomService.createRoom(data).subscribe({
        next: () => showToast('Room details successfully registered! 🎉  ', 'alert-success', this.toastVisible, this.toastStyles, this.alertStyles, this.alertMessage),
        error: err => {
          const errorMessage = extractErrorMessage(err);
          showToast(errorMessage, 'alert-error', this.toastVisible, this.toastStyles, this.alertStyles, this.alertMessage);
        }})
    } else {
      showToast('Error: Form is invalid. Check missing values.', 'alert-error', this.toastVisible, this.toastStyles, this.alertStyles, this.alertMessage);
    }
  }
}
