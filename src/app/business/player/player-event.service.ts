import { Injectable } from '@angular/core';
import {EventManager} from '../../helpers/event';

type eventType = 'playSong' | 'pauseSong';
type eventData = [string, string];

@Injectable({
  providedIn: 'root'
})
export class PlayerEventService {
  public eventManager = new EventManager();
  constructor() { }
  emit = (type: eventType, data: eventData) => {
    this.eventManager.emit(type, data);
  }
  on = (type: eventType, cb: (data: eventData) => void) => {
    return this.eventManager.on(type, cb);
  }
  off = (...args) => {
    this.eventManager.off(...args);
  }
}
