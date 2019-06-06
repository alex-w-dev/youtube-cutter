import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoListForReviewComponent } from './video-list-for-review.component';

describe('VideoListForReviewComponent', () => {
  let component: VideoListForReviewComponent;
  let fixture: ComponentFixture<VideoListForReviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VideoListForReviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VideoListForReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
