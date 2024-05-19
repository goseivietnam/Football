import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrashCanPostComponent } from './trash-can-post.component';

describe('TrashCanPostComponent', () => {
  let component: TrashCanPostComponent;
  let fixture: ComponentFixture<TrashCanPostComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TrashCanPostComponent]
    });
    fixture = TestBed.createComponent(TrashCanPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
