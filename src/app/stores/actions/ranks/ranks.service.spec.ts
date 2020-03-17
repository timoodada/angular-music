import { TestBed } from '@angular/core/testing';

import { RanksService } from './ranks.service';
import {HttpClientModule} from '@angular/common/http';

describe('RanksService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientModule
    ]
  }));

  it('should be created', () => {
    const service: RanksService = TestBed.inject(RanksService);
    expect(service).toBeTruthy();
  });
});
