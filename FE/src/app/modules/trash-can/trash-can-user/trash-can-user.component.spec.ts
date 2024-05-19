import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrashCanUserComponent } from './trash-can-user.component';

describe('TrashCanUserComponent', () => {
  let component: TrashCanUserComponent;
  let fixture: ComponentFixture<TrashCanUserComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TrashCanUserComponent]
    });
    fixture = TestBed.createComponent(TrashCanUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
