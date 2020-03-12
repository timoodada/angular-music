import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SearchComponent} from './search.component';
import {RouterModule, Routes} from '@angular/router';
import {LayoutModule} from '../../components/layout/layout.module';
import {SearchBoxModule} from '../../business/search-box/search-box.module';
import {ScrollYModule} from '../../components/scroll-y/scroll-y.module';
import {SearchHistoryModule} from '../../business/search-history/search-history.module';
import {SearchListModule} from '../../business/search-list/search-list.module';
import {DetailComponent} from '../singers/detail/detail.component';
import {SingerDetailModule} from '../singers/detail/singer-detail.module';
import {RouterAnimationModule} from '../../components/router-animation/router-animation.module';

const routes: Routes = [{
  path: '',
  component: SearchComponent,
  children: [{
    path: ':id',
    component: DetailComponent
  }]
}];

@NgModule({
  declarations: [
    SearchComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    LayoutModule,
    SearchBoxModule,
    ScrollYModule,
    SearchHistoryModule,
    SearchListModule,
    SingerDetailModule,
    RouterAnimationModule
  ],
  exports: [
    SearchComponent
  ]
})
export class SearchRoutingModule { }
