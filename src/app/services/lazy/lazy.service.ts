import { Injectable } from '@angular/core';
import LazyLoad from 'vanilla-lazyload';

@Injectable({
  providedIn: 'root'
})
export class LazyService {
  private lazyLoad: any;
  constructor() {
    this.lazyLoad = new LazyLoad({
      container: document.body
    });
  }
  update = (elements?: NodeListOf<HTMLElement>): void => {
    this.lazyLoad.update(elements);
  }
  destroy = (): void => {
    this.lazyLoad.destroy();
  }
  load = (element: HTMLElement, force?: boolean): void => {
    this.lazyLoad.load(element, force);
  }
  loadAll = (): void => {
    this.lazyLoad.loadAll();
  }
}
