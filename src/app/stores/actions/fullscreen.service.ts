import { Injectable } from '@angular/core';
import store from '../';

@Injectable({
  providedIn: 'root'
})
export class FullscreenService {

  constructor() { }
  _getState() {
    return (store.getState() as any).get('fullscreen');
  }
  setFullScreen = (isFull: boolean) => {
    store.dispatch({
      type: 'SET_FULLSCREEN',
      value: isFull
    });
  }
  toggleFullScreen = () => {
    const toggle = !this._getState();
    this.setFullScreen(toggle);
  }
}
