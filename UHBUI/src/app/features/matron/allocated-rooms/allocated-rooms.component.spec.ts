import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllocatedRoomsComponent } from './allocated-rooms.component';

describe('AllocatedRoomsComponent', () => {
  let component: AllocatedRoomsComponent;
  let fixture: ComponentFixture<AllocatedRoomsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AllocatedRoomsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllocatedRoomsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
