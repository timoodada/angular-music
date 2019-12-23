import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {PlayerComponent} from './player.component';
import {ProgressCircleModule} from '../../components/progress-circle/progress-circle.module';

@NgModule({
  declarations: [
    PlayerComponent
  ],
  imports: [
    CommonModule,
    ProgressCircleModule
  ],
  exports: [
    PlayerComponent
  ]
})
export class PlayerModule { }
