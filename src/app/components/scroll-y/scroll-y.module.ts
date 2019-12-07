import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ScrollYComponent} from './scroll-y.component';
import {BubbleModule} from '../bubble/bubble.module';
import {LoadingModule} from '../loading/loading.module';

@NgModule({
  declarations: [
    ScrollYComponent
  ],
  imports: [
    CommonModule,
    BubbleModule,
    LoadingModule
  ],
  exports: [
    ScrollYComponent
  ]
})
export class ScrollYModule { }
