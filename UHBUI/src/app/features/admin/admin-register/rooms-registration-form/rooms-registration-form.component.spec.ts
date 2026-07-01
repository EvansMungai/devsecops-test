import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomsRegistrationFormComponent } from './rooms-registration-form.component';

describe('RoomsRegistrationFormComponent', () => {
  let component: RoomsRegistrationFormComponent;
  let fixture: ComponentFixture<RoomsRegistrationFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RoomsRegistrationFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RoomsRegistrationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
