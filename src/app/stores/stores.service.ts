import {Injectable, OnDestroy} from '@angular/core';
import store from './';
import {List} from 'immutable';
import {Music} from '../business/player';
import {PlayMode} from '../business/player/player.core';
import {Observable, Subscription} from 'rxjs';
import {EventManager} from '../helpers/event';

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
  private states: Map<string, any> = store.getState() as Map<string, any>;
  private observable: Observable<StateChanges>;
  private subscriptions: Subscription[] = [];
  private eventManager: EventManager;
  private init() {
    this.eventManager = new EventManager();
    this.observable = new Observable<StateChanges>(observer => {
      const unsubscribe = store.subscribe(() => {
        const newStates = store.getState() as Map<string, any>;
        const oldStates = this.states;
        this.states = newStates;
        const changes: StateChanges = {};
        newStates.forEach((val, key) => {
          if (val !== oldStates.get(key)) {
            changes[key] = {
              currentValue: val,
              previousValue: oldStates.get(key)
            };
            this.eventManager.emit(key, changes[key]);
          }
        });
        observer.next(changes);
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
  public get recent(): List<Music> {
    return this.states.get('recent');
  }
  public get history(): List<string> {
    return this.states.get('history');
  }
  // return a function to unwatch
  watch = (stateName: string, cb: (change: StateChange) => void): () => void => {
    if (typeof cb !== 'function') { return; }
    return this.eventManager.on(stateName, cb);
  }
  ngOnDestroy(): void {
    this.subscriptions.forEach(item => item.unsubscribe());
    this.eventManager.off();
  }
}
