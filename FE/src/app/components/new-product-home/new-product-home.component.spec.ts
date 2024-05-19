import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewProductHomePageComponent } from './new-product-home.component';

describe('NewProductHomePageComponent', () => {
  let component: NewProductHomePageComponent;
  let fixture: ComponentFixture<NewProductHomePageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NewProductHomePageComponent],
    });
    fixture = TestBed.createComponent(NewProductHomePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
