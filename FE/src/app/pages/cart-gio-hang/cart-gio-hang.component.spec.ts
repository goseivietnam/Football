import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartGioHangComponent } from './cart-gio-hang.component';

describe('CartGioHangComponent', () => {
  let component: CartGioHangComponent;
  let fixture: ComponentFixture<CartGioHangComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CartGioHangComponent]
    });
    fixture = TestBed.createComponent(CartGioHangComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
