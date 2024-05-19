import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvitebymeComponent } from './invitebyme.component';

describe('InvitebymeComponent', () => {
  let component: InvitebymeComponent;
  let fixture: ComponentFixture<InvitebymeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InvitebymeComponent]
    });
    fixture = TestBed.createComponent(InvitebymeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
