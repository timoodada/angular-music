import { TestBed } from '@angular/core/testing';

import { BannersService } from './banners.service';
import {HttpClientModule} from '@angular/common/http';

describe('BannersService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientModule
    ]
  }));

  it('should be created', () => {
    const service: BannersService = TestBed.get(BannersService);
    expect(service).toBeTruthy();
  });
});
