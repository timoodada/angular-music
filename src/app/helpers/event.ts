import {Observable} from 'rxjs';

interface Listeners {
  [prop: string]: any[];
}

export class EventManager {
  private listeners: Listeners = {};
  constructor() {}
  off = (eventName?: string, callback?: any) => {
    if (!eventName) {
      this.listeners = {};
    } else if (!callback) {
      this.listeners[eventName] = [];
    } else {
      for (const [i, v] of this.listeners[eventName].entries()) {
        if (v === callback) {
          this.listeners[eventName].splice(i, 1);
          break;
        }
      }
    }
  }
  on = (eventName: string, callback: (args?: any) => void) => {
    if (this.listeners[eventName]) {
      this.listeners[eventName].push(callback);
    } else {
      this.listeners[eventName] = [callback];
    }
    return (): void => { this.off(eventName, callback); };
  }
  emit = (eventName: string, ...args) => {
    const eventList = this.listeners[eventName];
    if (eventList && eventList.length) {
      eventList.forEach(item => {
        item(...args);
      });
    }
  }
}

export const globalEvent = new EventManager();

export function createObservableEventListener(eventName: string) {
  return new Observable(observer => {
    const unsubscribe = globalEvent.on(eventName, observer.next);
    return { unsubscribe };
  });
}
