import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HostelRegistrationFormComponent } from './hostel-registration-form.component';

describe('HostelRegistrationFormComponent', () => {
  let component: HostelRegistrationFormComponent;
  let fixture: ComponentFixture<HostelRegistrationFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HostelRegistrationFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HostelRegistrationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
