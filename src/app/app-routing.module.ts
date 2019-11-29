import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [{
  path: '',
  loadChildren: () => import('./views/home/home.module').then(res => res.HomeModule)
}, {
  path: 'setting',
  loadChildren: () => import('./views/settings/setting.module').then(res => res.SettingModule)
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
