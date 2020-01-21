import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SearchListComponent} from './search-list.component';
import {ScrollYModule} from '../../components/scroll-y/scroll-y.module';
import {EmptyModule} from '../../components/empty/empty.module';
import {LoadingModule} from '../../components/loading/loading.module';


@NgModule({
  declarations: [
    SearchListComponent
  ],
  imports: [
    CommonModule,
    ScrollYModule,
    EmptyModule,
    LoadingModule
  ],
  exports: [
    SearchListComponent
  ]
})
export class SearchListModule { }
