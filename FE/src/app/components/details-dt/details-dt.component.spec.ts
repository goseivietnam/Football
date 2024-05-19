import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsDtComponent } from './details-dt.component';

describe('DetailsDtComponent', () => {
  let component: DetailsDtComponent;
  let fixture: ComponentFixture<DetailsDtComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetailsDtComponent]
    });
    fixture = TestBed.createComponent(DetailsDtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
