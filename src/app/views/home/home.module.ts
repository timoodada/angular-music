import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HomeComponent} from './home.component';
import {RouterModule, Routes} from '@angular/router';
import {DetailComponent} from './detail/detail.component';
import {MessageComponent} from './message/message.component';
import {AnimationModule} from '../../components/animation/animation.module';
import {ListModule} from '../../components/list/list.module';
import {LayoutModule} from '../../components/layout/layout.module';
import {ScrollYModule} from '../../components/scroll-y/scroll-y.module';
import {LazyModule} from '../../directives/lazy/lazy.module';
import {SliderModule} from '../../components/slider/slider.module';
import {PipeModule} from '../../pipes/pipe.module';

const routes: Routes = [{
  path: '',
  component: HomeComponent,
  children: [{
    path: 'detail',
    component: DetailComponent
  }, {
    path: 'message',
    component: MessageComponent
  }]
}];

@NgModule({
  declarations: [
    HomeComponent,
    DetailComponent,
    MessageComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    AnimationModule,
    ListModule,
    LayoutModule,
    ScrollYModule,
    LazyModule,
    SliderModule,
    PipeModule
  ]
})
export class HomeModule { }
