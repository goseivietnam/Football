import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateFeeServiceComponent } from './create-fee-service.component';

describe('CreateFeeServiceComponent', () => {
  let component: CreateFeeServiceComponent;
  let fixture: ComponentFixture<CreateFeeServiceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateFeeServiceComponent]
    });
    fixture = TestBed.createComponent(CreateFeeServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
