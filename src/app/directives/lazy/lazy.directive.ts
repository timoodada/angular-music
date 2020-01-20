import {Directive, ElementRef, Input} from '@angular/core';
import {addClass} from '../../helpers/util';
import LazyLoad from 'vanilla-lazyload';
import lazy from './lazy.png';

const lazyLoad = new LazyLoad({
  elements_selector: '.lazy-load'
});

@Directive({
  selector: '[appLazy]'
})
export class LazyDirective {
  @Input()
  public set appLazy(src: string) {
    this.el.nativeElement.setAttribute('src', lazy);
    this.el.nativeElement.setAttribute('data-src', src);
    addClass(this.el.nativeElement, 'lazy-load');
    lazyLoad.update();
  }

  constructor(
    private el: ElementRef
  ) {}

}
