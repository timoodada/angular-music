import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ListComponent} from './list.component';
import {PaginationComponent} from '../pagination/pagination.component';


@NgModule({
  declarations: [
    ListComponent,
    PaginationComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ListComponent,
    PaginationComponent
  ]
})
export class ListModule { }
