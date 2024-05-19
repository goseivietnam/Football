import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsFieldAreaComponent } from './details-field-area.component';

describe('DetailsFieldAreaComponent', () => {
  let component: DetailsFieldAreaComponent;
  let fixture: ComponentFixture<DetailsFieldAreaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetailsFieldAreaComponent]
    });
    fixture = TestBed.createComponent(DetailsFieldAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
