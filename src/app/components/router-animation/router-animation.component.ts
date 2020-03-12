/*
* Animation For Route Switching
*/

import {Component, Input, OnInit} from '@angular/core';
import {slideAnimation} from './router.animate';
import {RouterOutlet} from '@angular/router';

const HISTORIES_KEY = '__HISTORIES_KEY__';
const MAX_LENGTH = 100;
const histories = (sessionStorage.getItem(HISTORIES_KEY) || '').split(',').filter(Boolean);

interface LastLocation {
  isPush: boolean;
  key: string | number;
}
let lastLocation: LastLocation = {
  isPush: true,
  key: null
};
const isHistoryPush = (location: any, update: any): boolean => {
  if (histories.length >= MAX_LENGTH) {
    histories.splice(0, histories.length - MAX_LENGTH);
  }
  const key = location.key || location.pathname + location.search;
  if (update && key !== lastLocation.key) {
    const index = histories.lastIndexOf(key);

    if (index > -1) {
      histories.splice(index + 1);
    } else {
      histories.push(key);
    }

    sessionStorage.setItem(HISTORIES_KEY, histories.join(','));

    lastLocation = {
      isPush: index < 0,
      key
    };
  }
  return lastLocation.isPush;
};
@Component({
  selector: 'app-router-animation',
  templateUrl: './router-animation.component.html',
  styleUrls: ['./router-animation.component.scss'],
  animations: [
    slideAnimation
  ]
})
export class RouterAnimationComponent implements OnInit {
  private currentPath: string;

  @Input()
  public type: 'fade' | 'slide';

  @Input()
  public outlet: RouterOutlet;

  private fadeTrigger: 'hide' | 'fade' = 'hide';

  private slideTrigger: 'forward' | 'backward' | 'bridge' | 'none' = 'none';
  private slideToEmpty = () => {
    this.slideTrigger = 'none';
  }
  private slideForward = () => {
    this.slideTrigger = this.slideTrigger === 'forward' ? 'bridge' : 'forward';
  }
  private slideBackward = () => {
    this.slideTrigger = this.slideTrigger === 'backward' ? 'bridge' : 'backward';
  }

  constructor() {}

  handleFade = (outlet: RouterOutlet) => {
    if (outlet && outlet.isActivated && location.pathname.indexOf(this.currentPath) !== 0) {
      this.fadeTrigger = this.fadeTrigger === 'fade' ? 'hide' : 'fade';
    }
    return this.fadeTrigger;
  }

  handleSlide = (outlet: RouterOutlet) => {
    if (this.currentPath) {
      if (outlet && outlet.isActivated && this.currentPath !== location.pathname) {
        if (isHistoryPush(location, true)) {
          this.slideBackward();
        } else {
          this.slideForward();
        }
      } else if (outlet && !outlet.isActivated) {
        this.slideToEmpty();
      }
    } else if (outlet && outlet.isActivated) {
      this.slideForward();
    }
    return this.slideTrigger;
  }
  prepareRoute = (outlet: RouterOutlet) => {
    let triggerName: string | null;
    switch (this.type) {
      case 'fade':
        triggerName = this.handleFade(outlet);
        break;
      case 'slide':
        triggerName = this.handleSlide(outlet);
        break;
      default:
    }
    if (outlet && outlet.isActivated) {
      this.currentPath = location.pathname;
    } else {
      this.currentPath = null;
    }
    return triggerName;
  }

  ngOnInit() {}
}
