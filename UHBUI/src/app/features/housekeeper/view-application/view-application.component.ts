import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ButtonComponent } from '../../../shared/elements/button/button.component';
import { SubmitButton } from '../../../core/interfaces/button.interface';
import { ToastComponent } from '../../../shared/elements/toast/toast.component';
import { LoadingComponent } from '../../../shared/elements/loading/loading.component';
import { ApplicationService } from '../../../core/services/application.service';
import { StudentService } from '../../../core/services/student.service';
import { HostelService } from '../../../core/services/hostel.service';
import { ApplicationData } from '../../../core/interfaces/applicationData';
import { showToast } from '../../../shared/utils/toastUtils';

@Component({
  selector: 'app-view-application',
  imports: [RouterModule, ReactiveFormsModule, ButtonComponent, ToastComponent, LoadingComponent],
  templateUrl: './view-application.component.html',
  styleUrl: './view-application.component.css'
})
export class ViewApplicationComponent implements OnInit {
  private fb = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  private applicationService = inject(ApplicationService);
  private studentService = inject(StudentService);
  private hostelService = inject(HostelService);

  reviewApplication: FormGroup = this.fb.group({
    status: ['', Validators.required],
    preferredHostel: ['']
  });
  readonly submitButtonProps: SubmitButton = {
    text: 'Review Application', type: 'submit', variant: "secondary", formId: 'reviewApplicationForm'
  };
  loadingStyles = 'loading-spinner loading-lg'

  readonly applicationDetails = signal<any | null>(null);
  readonly studentDetails = signal<any | null>(null);
  readonly hostelDetails = signal<any | null>(null);
  hostelType!: string;
  toastVisible = signal(false);
  toastStyles = signal('');
  alertStyles = signal('');
  alertMessage = signal('');

  ngOnInit(): void {
    this.route.paramMap.subscribe(paramMap => {
      const applicationId = Number(paramMap.get('id'));
      if (!isNaN(applicationId)) {
        this.applicationService.getSpecificApplication(applicationId).subscribe({
          next: (data) => {
            this.applicationDetails.set(data);
            const regNo = data.registrationNo;
            if (regNo) {
              this.studentService.getSpecificStudentData(regNo).subscribe({
                next: studentData => this.studentDetails.set(studentData),
                error: err => console.error('Error fetching student details: ', err)
              })
            }
            this.hostelService.getHostelsData().subscribe({
              next: hostelData => {
                this.hostelDetails.set(hostelData.map(h => h.hostelName));
                this.hostelType = this.hostelDetails().find((h: { name: string; type: string }) => h.name === this.studentDetails().preferredHostel?.type)
              },
              error: err => console.error('Error fetching student details: ', err)
            })
          },
          error: (err) => console.error("Error fetching application details: ", err)
        })
      } else {
        console.error('Invalid application Id')
      }
    })
  }
  onSubmit(): void {
    if (this.reviewApplication.valid) {
      const reviewData = this.reviewApplication.value;
      const applicationId = Number(this.route.snapshot.paramMap.get('id'));
      this.applicationService.reviewApplication(applicationId, reviewData.status, reviewData.preferredHostel || this.applicationDetails().preferredHostel).subscribe({
        next: () => showToast('You have successfully reviewed the application!', 'alert-success', this.toastVisible, this.toastStyles, this.alertStyles, this.alertMessage),
        error: err => showToast(`Error: ${err}`, 'alert-error', this.toastVisible, this.toastStyles, this.alertStyles, this.alertMessage)
      });
    } else {
      showToast('Application review was unsuccessful! Form is invalid!', 'alert-error', this.toastVisible, this.toastStyles, this.alertStyles, this.alertMessage)
    }
  }
}
