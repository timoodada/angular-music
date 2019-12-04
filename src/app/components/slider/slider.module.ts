import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SliderComponent} from './slider.component';
import {PipeModule} from '../../pipes/pipe.module';

@NgModule({
  declarations: [
    SliderComponent
  ],
  imports: [
    CommonModule,
    PipeModule
  ],
  exports: [
    SliderComponent
  ]
})
export class SliderModule { }
