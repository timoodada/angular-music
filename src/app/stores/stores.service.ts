import {Injectable, OnDestroy} from '@angular/core';
import store from './';
import {List} from 'immutable';
import {Music} from '../business/player';
import {PlayMode} from '../business/player/player.core';
import {Observable, Subscription} from 'rxjs';

interface StateChange {
  currentValue: any;
  previousValue: any;
}

interface StateChanges {
  [prop: string]: StateChange;
}
/**
 * @Author JiYuan.Chen
 * inject this service for component
 * for example:
 * @Component({
 *   providers: [StoresService]
 * })
 */
@Injectable({
  providedIn: null
})
export class StoresService implements OnDestroy {
  private states: any = store.getState();
  private observable: Observable<StateChanges>;
  private subscriptions: Subscription[] = [];
  private init() {
    this.observable = new Observable<StateChanges>(observer => {
      const unsubscribe = store.subscribe(() => {
        const newStates = store.getState() as Map<string, any>;
        const changes: StateChanges = {};
        newStates.forEach((val, key) => {
          if (val !== this.states.get(key)) {
            changes[key] = {
              currentValue: val,
              previousValue: this.states.get(key)
            };
          }
        });
        observer.next(changes);
        this.states = newStates;
      });
      return { unsubscribe };
    });
  }
  constructor() {
    this.init();
    this.subscriptions.push(
      this.observable.subscribe()
    );
  }
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
  watch = (stateName: string, cb: (change: StateChange) => void) => {
    if (typeof cb !== 'function') { return; }
    this.subscriptions.push(
      this.observable.subscribe(res => {
        if (res[stateName]) {
          cb(res[stateName]);
        }
      })
    );
  }
  ngOnDestroy(): void {
    this.subscriptions.forEach(item => item.unsubscribe());
  }
}
