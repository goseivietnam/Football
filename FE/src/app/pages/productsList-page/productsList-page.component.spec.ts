import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsListPageComponent } from './productsList-page.component';

describe('ProductsListPageComponent', () => {
  let component: ProductsListPageComponent;
  let fixture: ComponentFixture<ProductsListPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProductsListPageComponent],
    });
    fixture = TestBed.createComponent(ProductsListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
