import {Directive, ElementRef, Input} from '@angular/core';
import {addClass} from '../../helpers/util';

@Directive({
  selector: '[appLazy]'
})
export class LazyDirective {
  @Input()
  public set appLazy(src: string) {
    this.el.nativeElement.setAttribute('src', 'assets/images/lazy.png');
    this.el.nativeElement.setAttribute('data-src', src);
    addClass(this.el.nativeElement, 'lazy-load');
  }

  constructor(
    private el: ElementRef
  ) {}

}
