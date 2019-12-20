import store from './index';
import {SimpleChange, SimpleChanges} from '@angular/core';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
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
    const next = newStates.filter((val, key) => states.get(key) !== val).map((val, key) => {
      return { previousValue: states.get(key), currentValue: val };
    });
    observer.next(next);
    states = newStates;
  });
  return {unsubscribe(): void {
    subscribe();
  }};
});

export function getState(state: StateType) {
  return (store.getState() as any).get(state);
}
function stateCls(target) {
  if (target.__state__) { return; }
  target.__state__ = true;
  function factory(funcName) {
    let func = target[funcName] || (() => {});
    Object.defineProperty(target, funcName, {
      get() {
        return (...args) => {
          func.call(target, ...args);
        };
      },
      set(val) {
        const temp = func;
        func = (...args) => {
          temp(...args);
          val(...args);
        };
      }
    });
  }
  factory('ngOnChanges');
  factory('ngOnDestroy');
}
/*
* Decorator
* @State(state)
*/
export function State(state: StateType): (target: any, prop: string) => any {
  return (target: any, prop: string): any => {
    stateCls(target);
    const onChanges: (change: SimpleChanges) => void = target.ngOnChanges;
    let firstChange = true;
    target[prop] = getState(state);
    const subscribe = observable
      .pipe(
        map(val => val.get(state))
      )
      .subscribe((change) => {
        if (!change) { return; }
        target[prop] = change.currentValue;
        onChanges({
          [prop]: new SimpleChange(change.previousValue, change.currentValue, firstChange)
        });
        firstChange = false;
      });
    target.ngOnDestroy = () => {
      console.log('destroy');
      subscribe.unsubscribe();
    };
  };
}
