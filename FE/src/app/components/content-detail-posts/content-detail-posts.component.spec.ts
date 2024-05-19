import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentDetailPostsComponent } from './content-detail-posts.component';

describe('ContentDetailPostsComponent', () => {
  let component: ContentDetailPostsComponent;
  let fixture: ComponentFixture<ContentDetailPostsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ContentDetailPostsComponent]
    });
    fixture = TestBed.createComponent(ContentDetailPostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
