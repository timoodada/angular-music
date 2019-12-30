import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {PlayerComponent} from './player.component';
import {ProgressCircleModule} from '../../components/progress-circle/progress-circle.module';
import {ScrollYModule} from '../../components/scroll-y/scroll-y.module';
import {ProgressBarModule} from '../../components/progress-bar/progress-bar.module';
import {PlayingListComponent} from './playing-list/playing-list.component';

@NgModule({
  declarations: [
    PlayerComponent,
    PlayingListComponent
  ],
  imports: [
    CommonModule,
    ProgressCircleModule,
    ScrollYModule,
    ProgressBarModule
  ],
  exports: [
    PlayerComponent
  ]
})
export class PlayerModule { }
