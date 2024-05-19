import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentsProductComponent } from './comments-product.component';

describe('CommentsProductComponent', () => {
  let component: CommentsProductComponent;
  let fixture: ComponentFixture<CommentsProductComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CommentsProductComponent],
    });
    fixture = TestBed.createComponent(CommentsProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
