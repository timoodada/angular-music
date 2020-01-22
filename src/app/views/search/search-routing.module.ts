import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SearchComponent} from './search.component';
import {RouterModule, Routes} from '@angular/router';
import {LayoutModule} from '../../components/layout/layout.module';
import {SearchBoxModule} from '../../business/search-box/search-box.module';
import {ScrollYModule} from '../../components/scroll-y/scroll-y.module';
import {SearchHistoryModule} from '../../business/search-history/search-history.module';
import {SearchListModule} from '../../business/search-list/search-list.module';
import {DetailComponent} from './detail/detail.component';

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
    SearchComponent,
    DetailComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    LayoutModule,
    SearchBoxModule,
    ScrollYModule,
    SearchHistoryModule,
    SearchListModule
  ],
  exports: [
    SearchComponent,
    DetailComponent
  ]
})
export class SearchRoutingModule { }
