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
  public get playModeName() {
    const current: PlayMode = getState('playMode');
    switch (current) {
      case PlayMode.loop:
        return '单曲循环';
      case PlayMode.random:
        return '随机播放';
      case PlayMode.sequence:
        return '顺序播放';
      default:
        return '';
    }
  }
}
