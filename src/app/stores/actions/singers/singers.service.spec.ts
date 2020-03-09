import { TestBed } from '@angular/core/testing';

import { SingersService } from './singers.service';

describe('SingersService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SingersService = TestBed.get(SingersService);
    expect(service).toBeTruthy();
  });
});
