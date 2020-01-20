import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SearchHistoryComponent} from './search-history.component';


@NgModule({
  declarations: [
    SearchHistoryComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    SearchHistoryComponent
  ]
})
export class SearchHistoryModule { }
