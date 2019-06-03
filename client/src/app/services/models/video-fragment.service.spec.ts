import { TestBed } from '@angular/core/testing';

import { VideoFragmentService } from './video-fragment.service';

describe('VideoFragmentService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: VideoFragmentService = TestBed.get(VideoFragmentService);
    expect(service).toBeTruthy();
  });
});
