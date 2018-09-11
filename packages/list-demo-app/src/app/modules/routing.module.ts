import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ErrorPageComponent } from '../pages/index';
import { HomePageComponent } from '../pages/index';
import { ListPageComponent } from '../pages/index';
import { ListResolver } from '../services/index';
import { LoginPageComponent } from '../pages/index';

const appRoutes: Routes = [
  {
    path: 'login',
    component: LoginPageComponent,
  },
  {
    path: 'list',
    component: ListPageComponent,
    resolve: {
      listData: ListResolver,
    }
  },
  {
    path: 'home',
    component: HomePageComponent,
  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full',
  },
  {
    path: '**',
    component: ErrorPageComponent,
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
