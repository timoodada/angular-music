import store from './index';
import {SimpleChange, SimpleChanges} from '@angular/core';
import {Observable} from 'rxjs';
import {map, skipWhile} from 'rxjs/operators';
import {Map} from 'immutable';

/*
* store.subscribe To Observable
*/
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

function getState(state: string) {
  return (store.getState() as any).get(state);
}

/*
* Decorator
* @State(state)
*/
export function State(state: string): (target: any, prop: string) => any {
  return (target: any, prop: string): any => {
    const onDestroy = target.ngOnDestroy;
    const onChanges: (change: SimpleChanges) => void = target.ngOnChanges;
    let firstChange = true;
    target[prop] = getState(state);
    const subscribe = observable
      .pipe(map(val => val.get(prop)))
      .pipe(skipWhile(val => !val))
      .subscribe((change) => {
        target[prop] = change.currentValue;
        if (onChanges) {
          onChanges({ [prop]: new SimpleChange(change.previousValue, change.currentValue, firstChange) });
        }
        firstChange = false;
      });
    target.ngOnDestroy = () => {
      subscribe.unsubscribe();
      if (onDestroy) {
        onDestroy();
      }
    };
  };
}
