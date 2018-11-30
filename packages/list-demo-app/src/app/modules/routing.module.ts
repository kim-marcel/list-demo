import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuardService, ListResolver } from '../services';
import {
  ErrorPageComponent,
  HomePageComponent,
  ListPageComponent,
  SettingsPageComponent,
  SignInPageComponent,
  SignUpPageComponent,
  VerifyEmailPageComponent
} from '../pages';

const appRoutes: Routes = [
  {
    path: 'sign-in',
    component: SignInPageComponent,
  },
  {
    path: 'sign-up',
    component: SignUpPageComponent,
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
    path: 'settings',
    component: SettingsPageComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'verify-email',
    component: VerifyEmailPageComponent,
    // TODO
    // canActivate: [AuthGuardService],
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
