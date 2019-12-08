import { Injectable } from '@angular/core';
import {globalEvent, createObservableEventListener} from '../../helpers/event';

interface Listener {
  subscribe: (next?: any, error?: any, compete?: any) => any;
}

@Injectable({
  providedIn: 'root'
})
export class EventService {

  public events: any[];

  constructor() {
    this.events = [];
  }

  destroy = () => {
    this.events.forEach(item => item.unsubscribe());
  }

  on = (eventName: string): Listener => {
    const observable = createObservableEventListener(eventName);
    return {
      subscribe: (...args) => {
        const sub = observable.subscribe(...args);
        this.events.push(sub);
        return sub;
      }
    };
  }

  emit = (eventName: string, ...args): void => {
    globalEvent.emit(eventName, ...args);
  }
}
