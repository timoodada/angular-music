import {Directive, ElementRef, Input} from '@angular/core';
import {addClass} from '../../helpers/util';
import lazy from './lazy.png';

@Directive({
  selector: '[appLazy]'
})
export class LazyDirective {
  @Input()
  public set appLazy(src: string) {
    this.el.nativeElement.setAttribute('src', lazy);
    this.el.nativeElement.setAttribute('data-src', src);
    addClass(this.el.nativeElement, 'lazy-load');
  }

  constructor(
    private el: ElementRef
  ) {}

}
