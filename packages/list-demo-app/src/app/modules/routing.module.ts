import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuardService } from '../services';
import { ErrorPageComponent } from '../pages';
import { HomePageComponent } from '../pages';
import { ListPageComponent } from '../pages';
import { ListResolver } from '../services';
import { LoginPageComponent } from '../pages';

const appRoutes: Routes = [
  {
    path: 'login',
    component: LoginPageComponent,
  },
  {
    path: 'list',
    component: ListPageComponent,
    canActivate: [AuthGuardService],
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
