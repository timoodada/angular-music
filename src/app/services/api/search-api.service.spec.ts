import { TestBed } from '@angular/core/testing';

import { SearchApiService } from './search-api.service';
import {HttpClientModule} from '@angular/common/http';

describe('SearchApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientModule
    ]
  }));

  it('should be created', () => {
    const service: SearchApiService = TestBed.inject(SearchApiService);
    expect(service).toBeTruthy();
  });
});
