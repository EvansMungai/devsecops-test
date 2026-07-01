import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterStudentDetailsComponent } from './register-student-details.component';

describe('RegisterStudentDetailsComponent', () => {
  let component: RegisterStudentDetailsComponent;
  let fixture: ComponentFixture<RegisterStudentDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterStudentDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterStudentDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
