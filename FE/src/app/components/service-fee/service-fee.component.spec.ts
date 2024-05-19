import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceFeeComponent } from './service-fee.component';

describe('ServiceFeeComponent', () => {
  let component: ServiceFeeComponent;
  let fixture: ComponentFixture<ServiceFeeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ServiceFeeComponent]
    });
    fixture = TestBed.createComponent(ServiceFeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
