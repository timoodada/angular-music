import { LazyDirective } from './lazy.directive';
import {ElementRef} from '@angular/core';

describe('LazyDirective', () => {
  it('should create an instance', () => {
    const el: ElementRef = new ElementRef(document.createElement('img'));
    const directive = new LazyDirective(el);
    expect(directive).toBeTruthy();
  });
});
