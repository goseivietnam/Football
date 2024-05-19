import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutModalAdminComponent } from './layout-modal-admin.component';

describe('LayoutModalAdminComponent', () => {
  let component: LayoutModalAdminComponent;
  let fixture: ComponentFixture<LayoutModalAdminComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LayoutModalAdminComponent]
    });
    fixture = TestBed.createComponent(LayoutModalAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
