import { TestBed } from '@angular/core/testing';

import { PlayerEventService } from './player-event.service';

describe('PlayerEventService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PlayerEventService = TestBed.get(PlayerEventService);
    expect(service).toBeTruthy();
  });
});
