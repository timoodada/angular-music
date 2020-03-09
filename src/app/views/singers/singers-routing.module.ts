import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Routes, RouterModule} from '@angular/router';
import {SingersComponent} from './singers.component';
import {LayoutModule} from '../../components/layout/layout.module';
import {ScrollYModule} from '../../components/scroll-y/scroll-y.module';
import {LazyModule} from '../../directives/lazy/lazy.module';

const routes: Routes = [{
  path: '',
  component: SingersComponent
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
        LazyModule
    ],
  exports: [
    SingersComponent
  ]
})
export class SingersRoutingModule { }
