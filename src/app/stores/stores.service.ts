import { Injectable } from '@angular/core';
import store from './';
import {List} from 'immutable';
import {Music} from '../business/player';
import {PlayMode} from '../business/player/player.core';
import {EventManager} from '../helpers/event';
import {Observable} from 'rxjs';

interface StateChange {
  newVal: any;
  oldVal: any;
}

@Injectable({
  providedIn: 'root'
})
export class StoresService {
  private states: any = store.getState();
  private eventManager: EventManager = new EventManager();

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
  observe = (stateName: string): Observable<StateChange> => {
    return this.eventManager.observe(stateName);
  }
}
