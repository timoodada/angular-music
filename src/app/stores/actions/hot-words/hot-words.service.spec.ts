import { TestBed } from '@angular/core/testing';

import { HotWordsService } from './hot-words.service';

describe('HotWordsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HotWordsService = TestBed.get(HotWordsService);
    expect(service).toBeTruthy();
  });
});
