import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Routes, RouterModule} from '@angular/router';
import {SingersComponent} from './singers.component';
import {LayoutModule} from '../../components/layout/layout.module';

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
    LayoutModule
  ],
  exports: [
    SingersComponent
  ]
})
export class SingersRoutingModule { }
