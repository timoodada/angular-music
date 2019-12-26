import { Injectable } from '@angular/core';
import store from './';
import {List} from 'immutable';
import {Music} from '../business/player';
import {PlayMode} from '../business/player/player.core';
import {EventManager} from '../helpers/event';

@Injectable({
  providedIn: 'root'
})
export class StoresService {
  private states: any = store.getState();
  private eventManager: EventManager;

  public get banners(): List<any> {
    return this.states.get('banners');
  }
  public get ranks(): List<any> {
    return this.states.get('ranks');
  }
  public get currentSong(): Music | null {
    return this.states.get('currentSong');
  }
  public get playList(): List<Music> {
    return this.states.get('playList');
  }
  public get playMode(): PlayMode {
    return this.states.get('playMode');
  }
  public get fullscreen(): boolean {
    return this.states.get('fullscreen');
  }
  constructor() {
    this.eventManager = new EventManager();
    store.subscribe(() => {
      const newStates = store.getState() as Map<string, any>;
      newStates.forEach((val, key) => {
        if (val !== this.states.get(key)) {
          this.eventManager.emit(key, {
            newVal: val,
            oldVal: this.states.get(key)
          });
        }
      });
      this.states = newStates;
    });
  }
  watch = (stateName: string, callback: (newVal: any, oldVal: any) => void, context: any) => {
    const unsubscribe = this.eventManager.on(stateName, (e) => {
      callback(e.newVal, e.oldVal);
    });
    const ngOnDestroy = context.ngOnDestroy;
    context.ngOnDestroy = () => {
      if (typeof ngOnDestroy === 'function') {
        ngOnDestroy.apply(context);
        unsubscribe();
      }
    };
  }
}
