import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {BubbleComponent} from './bubble.component';


@NgModule({
  declarations: [
    BubbleComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    BubbleComponent
  ]
})
export class BubbleModule { }
