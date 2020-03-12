import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Routes, RouterModule} from '@angular/router';
import {LayoutModule} from '../../components/layout/layout.module';
import {ScrollYModule} from '../../components/scroll-y/scroll-y.module';
import {LazyModule} from '../../directives/lazy/lazy.module';
import {DetailComponent} from './detail/detail.component';
import {RouterAnimationModule} from '../../components/router-animation/router-animation.module';
import {MusicListModule} from '../../business/music-list/music-list.module';
import {SingerDetailModule} from './detail/singer-detail.module';
import {SingersComponent} from './singers.component';

const routes: Routes = [{
  path: '',
  component: SingersComponent,
  children: [{
    path: ':id',
    component: DetailComponent
  }]
}];

@NgModule({
  declarations: [
    SingersComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    LayoutModule,
    ScrollYModule,
    LazyModule,
    RouterAnimationModule,
    MusicListModule,
    SingerDetailModule
  ],
  exports: [
    SingersComponent
  ]
})
export class SingersRoutingModule { }
