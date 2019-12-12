/*
* Animation For Route Switching
*/

import { Component, OnInit, Input } from '@angular/core';
import {fadeAnimation} from './fade';
import {slideAnimation} from './slide';
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
    fadeAnimation,
    slideAnimation
  ]
})
export class RouterAnimationComponent implements OnInit {
  private outletComponent: any;

  @Input()
  public type: 'fade' | 'slide';

  @Input()
  public outlet: RouterOutlet;

  private fadeTriggerIndex = 0;
  private fadeTriggers: string[] = ['fadein', 'fadeout'];

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
    if (
      (outlet && outlet.isActivated && this.outletComponent !== outlet.component) ||
      outlet && !outlet.isActivated && this.outletComponent
    ) {
      this.fadeTriggerIndex = (this.fadeTriggerIndex + 1) % this.fadeTriggers.length;
    }
    return this.fadeTriggers[this.fadeTriggerIndex];
  }
  prepareRoute = (outlet: RouterOutlet) => {
    let triggerName: string | null;
    if (this.type !== 'fade') { return null; }
    triggerName = this.handleFade(outlet);
    if (outlet && outlet.isActivated) {
      this.outletComponent = outlet.component;
    } else {
      this.outletComponent = null;
    }
    return triggerName;
  }

  handleSlide = (outlet: RouterOutlet) => {
    if (this.outletComponent) {
      if (outlet && outlet.isActivated && this.outletComponent !== outlet.component) {
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
  prepareSlideRoute = (outlet: RouterOutlet) => {
    let triggerName: string | null;
    if (this.type !== 'slide') { return null; }
    triggerName = this.handleSlide(outlet);
    if (outlet && outlet.isActivated) {
      this.outletComponent = outlet.component;
    } else {
      this.outletComponent = null;
    }
    return triggerName;
  }

  ngOnInit() {}
}
