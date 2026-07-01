import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewAllocationsComponent } from './review-allocations.component';

describe('ReviewAllocationsComponent', () => {
  let component: ReviewAllocationsComponent;
  let fixture: ComponentFixture<ReviewAllocationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReviewAllocationsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReviewAllocationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
