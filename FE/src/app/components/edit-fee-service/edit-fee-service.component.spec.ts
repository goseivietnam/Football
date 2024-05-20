import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditFeeServiceComponent } from './edit-fee-service.component';

describe('EditFeeServiceComponent', () => {
  let component: EditFeeServiceComponent;
  let fixture: ComponentFixture<EditFeeServiceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditFeeServiceComponent]
    });
    fixture = TestBed.createComponent(EditFeeServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
