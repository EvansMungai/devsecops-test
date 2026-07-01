import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeRoleFormComponent } from './change-role-form.component';

describe('ChangeRoleFormComponent', () => {
  let component: ChangeRoleFormComponent;
  let fixture: ComponentFixture<ChangeRoleFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChangeRoleFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChangeRoleFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
