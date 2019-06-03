import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoFragmentEditorComponent } from './video-fragment-editor.component';

describe('VideoFragmentEditorComponent', () => {
  let component: VideoFragmentEditorComponent;
  let fixture: ComponentFixture<VideoFragmentEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VideoFragmentEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VideoFragmentEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
