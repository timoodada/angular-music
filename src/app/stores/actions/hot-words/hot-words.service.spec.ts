import { TestBed } from '@angular/core/testing';

import { HotWordsService } from './hot-words.service';
import {HttpClientModule} from '@angular/common/http';

describe('HotWordsService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientModule
    ]
  }));

  it('should be created', () => {
    const service: HotWordsService = TestBed.get(HotWordsService);
    expect(service).toBeTruthy();
  });
});
