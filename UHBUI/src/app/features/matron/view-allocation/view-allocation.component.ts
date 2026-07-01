import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ButtonComponent } from '../../../shared/elements/button/button.component';
import { LoadingComponent } from '../../../shared/elements/loading/loading.component';
import { SubmitButton } from '../../../core/interfaces/button.interface';
import { ToastComponent } from '../../../shared/elements/toast/toast.component';
import { showToast } from '../../../shared/utils/toastUtils';
import { ApplicationService } from '../../../core/services/application.service';
import { RoomService } from '../../../core/services/room.service';
import { HostelService } from '../../../core/services/hostel.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-view-allocation',
  imports: [RouterModule, ReactiveFormsModule, ButtonComponent, ToastComponent, LoadingComponent],
  templateUrl: './view-allocation.component.html',
  styleUrl: './view-allocation.component.css'
})
export class ViewAllocationComponent implements OnInit {
  private fb = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  private applicationService = inject(ApplicationService);
  private roomService = inject(RoomService);
  private hostelService = inject(HostelService);

  allocateRoomForm: FormGroup = this.fb.group({
    roomNo: ['', Validators.required]
  });
  submitButtonProps: SubmitButton = {
    text: 'Allocate Room', type: 'submit', variant: 'secondary', formId: 'roomAllocationForm'
  }
  readonly applicationDetails = signal<any | null>(null);
  readonly hostelDetails = signal<any | null>(null);
  readonly roomDetails = signal<any | null>(null);
  applicationId!: number;
  targetHostelRooms = signal<string[] | null>(null);
  toastVisible = signal(false);
  toastStyles = signal('');
  alertStyles = signal('');
  alertMessage = signal('');
  loadingStyles = 'loading-spinner loading-lg'

  ngOnInit(): void {
    this.route.paramMap.subscribe(paramap => {
      this.applicationId = Number(paramap.get('id'));
      if (!isNaN(this.applicationId)) {
        this.applicationService.getSpecificApplication(this.applicationId).subscribe({
          next: data => {
            this.applicationDetails.set(data);
            const targetHostelName = data.preferredHostel;
            this.hostelService.getHostelsData().subscribe({
              next: data => {
                const targetHostelNo = data.find(h => h.hostelName === targetHostelName)?.hostelNo;
                this.roomService.getRoomsData().subscribe({
                  next: data => this.targetHostelRooms.set(data.filter(r => r.hostelNo === targetHostelNo).map(r => r.roomNo)),
                  error: err => console.error('Error fetching rooms details: ', err)
                })
              }
            })
          },
          error: err => console.error('Error fetching specific application: ', err)
        })
      }
    });
  }

  onSubmit(): void {
    if (this.allocateRoomForm.valid) {
      const allocateRoomData = this.allocateRoomForm.value;
      const applicationId = Number(this.route.snapshot.paramMap.get('id'));
      this.applicationService.allocateRoomToApplicant(applicationId, allocateRoomData?.roomNo).subscribe({
        next: () => showToast('Room successfully allocated to the applicant! 🎉  ', 'alert-success', this.toastVisible, this.toastStyles, this.alertStyles, this.alertMessage),
        error: err => showToast(`Error: ${err}`, 'alert-error', this.toastVisible, this.toastStyles, this.alertStyles, this.alertMessage)
      })

    } else {
      console.log("Form invalid");
      showToast('Error: Room number is required. Please provide a valid room number to proceed.', 'alert-error', this.toastVisible, this.toastStyles, this.alertStyles, this.alertMessage);
    }
  }
}
