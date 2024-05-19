import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsDetailPageComponent } from './product-detail-page.component';

describe('ProductsDetailPageComponent', () => {
  let component: ProductsDetailPageComponent;
  let fixture: ComponentFixture<ProductsDetailPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProductsDetailPageComponent],
    });
    fixture = TestBed.createComponent(ProductsDetailPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
