import store from './index';
import {SimpleChange, SimpleChanges} from '@angular/core';
import {Observable} from 'rxjs';
import {map, skipWhile} from 'rxjs/operators';
import {Map} from 'immutable';

/*
* store.subscribe To Observable<StateChanges>
*/
type StateType =
  'banners' |
  'ranks' |
  'currentSong' |
  'playList' |
  'playMode';
type StateMap = Map<any, any>;
interface StateChange {
  previousValue: any;
  currentValue: any;
}
type StateChanges = Map<string, StateChange>;
const observable: Observable<StateChanges> = new Observable(observer => {
  let states: StateMap = store.getState() as StateMap;
  const subscribe = store.subscribe(() => {
    const newStates: StateMap = store.getState() as StateMap;
    observer.next(
      newStates.filter((key, val) => states.get(key) !== val).map((val, key) => {
        return { previousValue: states.get(key), currentValue: val };
      })
    );
    states = newStates;
  });
  return {unsubscribe(): void {
    subscribe();
  }};
});

export function getState(state: StateType) {
  return (store.getState() as any).get(state);
}
function StateCls(target) {
  Object.defineProperty(target.prototype, 'ngOnChanges', {
    set() {
    }
  });
}
/*
* Decorator
* @State(state)
*/
export function State(state: StateType): (target: any, prop: string) => any {
  return (target: any, prop: string): any => {
    const onDestroy = target.ngOnDestroy;
    const onChanges: (change: SimpleChanges) => void = target.ngOnChanges;
    let firstChange = true;
    target[prop] = getState(state);
    const subscribe = observable
      .pipe(map(val => val.get(state)))
      .pipe(skipWhile(val => !val))
      .subscribe((change) => {
        target[prop] = change.currentValue;
        if (onChanges) {
          onChanges.call(target, {
            [prop]: new SimpleChange(change.previousValue, change.currentValue, firstChange)
          });
        }
        firstChange = false;
      });
    target.ngOnDestroy = () => {
      subscribe.unsubscribe();
      if (onDestroy) {
        onDestroy.call(target);
      }
    };
  };
}
