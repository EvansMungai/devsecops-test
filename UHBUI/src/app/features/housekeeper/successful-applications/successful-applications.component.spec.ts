import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuccessfulApplicationsComponent } from './successful-applications.component';

describe('SuccessfulApplicationsComponent', () => {
  let component: SuccessfulApplicationsComponent;
  let fixture: ComponentFixture<SuccessfulApplicationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SuccessfulApplicationsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SuccessfulApplicationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
