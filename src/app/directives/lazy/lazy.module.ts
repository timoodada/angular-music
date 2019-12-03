import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {LazyDirective} from './lazy.directive';


@NgModule({
  declarations: [
    LazyDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    LazyDirective
  ]
})
export class LazyModule { }
