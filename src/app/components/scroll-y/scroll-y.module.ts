import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ScrollYComponent} from './scroll-y.component';
import {LoadingModule} from '../loading/loading.module';
import {BubbleComponent} from './bubble/bubble.component';

@NgModule({
  declarations: [
    ScrollYComponent,
    BubbleComponent
  ],
  imports: [
    CommonModule,
    LoadingModule
  ],
  exports: [
    ScrollYComponent
  ]
})
export class ScrollYModule { }
