import { Component, inject, OnInit, signal, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators, FormControl } from '@angular/forms';

import { ButtonComponent } from '../../../shared/elements/button/button.component';
import { SubmitButton } from '../../../core/interfaces/button.interface';
import { ToastComponent } from '../../../shared/elements/toast/toast.component';
import { ApplicationService } from '../../../core/services/application.service';
import { ApplicationData } from '../../../core/interfaces/applicationData';
import { showToast } from '../../../shared/utils/toastUtils';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'booking-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ButtonComponent, ToastComponent],
  templateUrl: './booking.component.html',
  styleUrl: './booking.component.css'
})
export class BookingComponent implements OnInit {
  private fb = inject(FormBuilder);
  private bookingService = inject(ApplicationService);

  bookingForm = this.fb.group({
    registrationNo: ['', [Validators.required, Validators.pattern('^[A-Z]\\d{3}-\\d{2}-\\d{4}/\\d{4}$')]],
    hostelName: ['', Validators.required],
    applicationPeriod: ['', Validators.required],
    isDisabled: ['', Validators.required],
    disabilityDetails: new FormControl({ value: '', disabled: true }),
    accommodationBefore: ['', Validators.required],
    accommodationPeriod: new FormControl({ value: '', disabled: true }),
    isSponsored: ['', Validators.required],
    sponsor: new FormControl({ value: '', disabled: true }),
    receivesHelb: ['', Validators.required],
    helbAmount: new FormControl({ value: '', disabled: true }),
    receivesBursary: ['', Validators.required],
    bursaryAmount: new FormControl({ value: '', disabled: true }),
    workStudyBenefitsBefore: ['', Validators.required],
    workStudyPeriod: new FormControl({ value: '', disabled: true }),
    specialExamsBefore: ['', Validators.required],
    specialExamsPeriod: new FormControl({ value: '', disabled: true }),
    considerationReasons: ['', Validators.required]
  });

  submitButtonProps: SubmitButton = {
    text: 'Submit',
    type: 'submit',
    variant: 'secondary',
    formId: 'bookingForm'
  };

  toastVisible = signal(false);
  toastStyles = signal('');
  alertStyles = signal('');
  alertMessage = signal('');

  ngOnInit(): void {
    this.setupConditionalFields('isDisabled', 'disabilityDetails');
    this.setupConditionalFields('accommodationBefore', 'accommodationPeriod');
    this.setupConditionalFields('isSponsored', 'sponsor');
    this.setupConditionalFields('receivesHelb', 'helbAmount');
    this.setupConditionalFields('receivesBursary', 'bursaryAmount');
    this.setupConditionalFields('workStudyBenefitsBefore', 'workStudyPeriod');
    this.setupConditionalFields('specialExamsBefore', 'specialExamsPeriod');
  }

  private setupConditionalFields(triggerField: string, targetField: string): void {
    this.bookingForm.get(triggerField)?.valueChanges.subscribe(value => {
      const control = this.bookingForm.get(targetField);
      if (value === 'YES') {
        control?.enable();
      } else {
        control?.disable();
        control?.reset();
      }
    });
  }
  private convertToApplicationData(form: any): ApplicationData {
    return {
      applicationPeriod: form.applicationPeriod,
      registrationNo: form.registrationNo,
      preferredHostel: form.hostelName,
      disability: form.isDisabled,
      disabilityDetails: form.disabilityDetails || null,
      accommodatedBefore: form.accommodationBefore,
      accommodationPeriod: form.accommodationPeriod || null,
      isSponsored: form.isSponsored,
      sponsor: form.sponsor || null,
      receivesHelb: form.receivesHelb,
      helbAmount: form.helbAmount || null,
      receivedBursary: form.receivesBursary,
      bursaryAmount: form.bursaryAmount || null,
      workStudyBenefitsBefore: form.workStudyBenefitsBefore,
      workStudyPeriod: form.workStudyPeriod || null,
      specialExamsOnFinancialGrounds: form.specialExamsBefore,
      specialExamPeriod: form.specialExamsPeriod || null,
      reasonsForConsideration: form.considerationReasons
    }
  }

  onSubmit(): void {
    if (!this.bookingForm.valid) {
      showToast('Your form was not submitted!', 'alert-error', this.toastVisible, this.toastStyles, this.alertStyles, this.alertMessage)
      return;
    }

    this.bookingService.createApplication(this.convertToApplicationData(this.bookingForm.value)).subscribe({
      next: () => showToast('Your form has been submitted successfully!', 'alert-success', this.toastVisible, this.toastStyles, this.alertStyles, this.alertMessage),
      error: (err: HttpErrorResponse) => {
        const errorMessage = typeof err.error === 'string' ? err.error : err.error?.message || err.message || 'An unexpected error occured';
        showToast(`Submission failed: ${errorMessage}`, 'alert-error', this.toastVisible, this.toastStyles, this.alertStyles, this.alertMessage);
      }
    });
  }
}