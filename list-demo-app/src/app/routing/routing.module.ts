import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from '../login/login.component';
import { ListComponent } from '../list/list.component';
import { ListResolver } from '../services';

const appRoutes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'list',
    component: ListComponent,
    resolve: {
      listData: ListResolver
    }
  },
  {
    path: '',
    redirectTo: '/list',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: '/list',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(appRoutes)
  ],
  declarations: [],
  exports: [
    RouterModule
  ]
})
export class RoutingModule { }
