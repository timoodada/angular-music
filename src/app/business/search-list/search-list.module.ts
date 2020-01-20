import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SearchListComponent} from './search-list.component';
import {ScrollYModule} from '../../components/scroll-y/scroll-y.module';


@NgModule({
  declarations: [
    SearchListComponent
  ],
  imports: [
    CommonModule,
    ScrollYModule
  ],
  exports: [
    SearchListComponent
  ]
})
export class SearchListModule { }
