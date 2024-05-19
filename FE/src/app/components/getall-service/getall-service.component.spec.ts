import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetallServiceComponent } from './getall-service.component';

describe('GetallServiceComponent', () => {
  let component: GetallServiceComponent;
  let fixture: ComponentFixture<GetallServiceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GetallServiceComponent]
    });
    fixture = TestBed.createComponent(GetallServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
