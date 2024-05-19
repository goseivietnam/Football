import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerTrashCanComponent } from './manager-trash-can.component';

describe('ManagerTrashCanComponent', () => {
  let component: ManagerTrashCanComponent;
  let fixture: ComponentFixture<ManagerTrashCanComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ManagerTrashCanComponent]
    });
    fixture = TestBed.createComponent(ManagerTrashCanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
