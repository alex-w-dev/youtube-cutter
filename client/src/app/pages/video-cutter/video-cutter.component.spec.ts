import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoCutterComponent } from './video-cutter.component';

describe('VideoListForReviewComponent', () => {
  let component: VideoCutterComponent;
  let fixture: ComponentFixture<VideoCutterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VideoCutterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VideoCutterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
