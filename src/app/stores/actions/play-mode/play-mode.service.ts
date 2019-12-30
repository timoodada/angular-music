import { Injectable } from '@angular/core';
import store, {getState} from '../../index';
import {PlayMode} from '../../../business/player/player.core';

@Injectable({
  providedIn: 'root'
})
export class PlayModeService {

  constructor() {}
  setPlayMode = (mode: PlayMode): void => {
    store.dispatch({
      type: 'SET_PLAY_MODE',
      value: mode
    });
  }
  next = () => {
    const current = getState('playMode');
    this.setPlayMode((current + 1) % 3);
  }
}
