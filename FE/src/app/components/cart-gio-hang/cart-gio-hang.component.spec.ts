import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartGioHangComponent2 } from './cart-gio-hang.component';

describe('CartGioHangComponent', () => {
  let component: CartGioHangComponent2;
  let fixture: ComponentFixture<CartGioHangComponent2>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CartGioHangComponent2]
    });
    fixture = TestBed.createComponent(CartGioHangComponent2);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
