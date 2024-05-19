import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsDanhsachComponent } from './details-danhsach.component';

describe('DetailsDanhsachComponent', () => {
  let component: DetailsDanhsachComponent;
  let fixture: ComponentFixture<DetailsDanhsachComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetailsDanhsachComponent]
    });
    fixture = TestBed.createComponent(DetailsDanhsachComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
