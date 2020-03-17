import { TestBed } from '@angular/core/testing';

import { FullscreenService } from './fullscreen.service';

describe('FullscreenService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FullscreenService = TestBed.inject(FullscreenService);
    expect(service).toBeTruthy();
  });
});
