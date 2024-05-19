import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RelatedPostsComponent } from './related-posts.component';

describe('RelatedPostsComponent', () => {
  let component: RelatedPostsComponent;
  let fixture: ComponentFixture<RelatedPostsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RelatedPostsComponent]
    });
    fixture = TestBed.createComponent(RelatedPostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
