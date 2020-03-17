import { TestBed } from '@angular/core/testing';

import { SingersService } from './singers.service';
import {HttpClientModule} from '@angular/common/http';

describe('SingersService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientModule
    ]
  }));

  it('should be created', () => {
    const service: SingersService = TestBed.inject(SingersService);
    expect(service).toBeTruthy();
  });
});
