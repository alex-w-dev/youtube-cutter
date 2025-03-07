import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoFragmentationComponent } from './video-fragmentation.component';

describe('VideoListForReviewComponent', () => {
  let component: VideoFragmentationComponent;
  let fixture: ComponentFixture<VideoFragmentationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VideoFragmentationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VideoFragmentationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
