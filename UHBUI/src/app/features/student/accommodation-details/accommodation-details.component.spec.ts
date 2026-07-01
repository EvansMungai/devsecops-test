import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccommodationDetialsComponent } from './accommodation-detials.component';

describe('AccommodationDetialsComponent', () => {
  let component: AccommodationDetialsComponent;
  let fixture: ComponentFixture<AccommodationDetialsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccommodationDetialsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccommodationDetialsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
