import { TestBed } from '@angular/core/testing';

import { PlayListService } from './play-list.service';
import {HttpClientModule} from '@angular/common/http';

describe('PlayListService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientModule
    ]
  }));

  it('should be created', () => {
    const service: PlayListService = TestBed.get(PlayListService);
    expect(service).toBeTruthy();
  });
});
