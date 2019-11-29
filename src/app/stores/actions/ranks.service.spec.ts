import { TestBed } from '@angular/core/testing';

import { RanksService } from './ranks.service';

describe('RanksService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RanksService = TestBed.get(RanksService);
    expect(service).toBeTruthy();
  });
});
