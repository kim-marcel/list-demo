import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {
  SignedInAndEmailNotVerifiedGuard,
  SignedInAndEmailVerifiedGuardGuard,
  SignedInGuard,
  NotSignedInGuard
} from '../services';
import {
  ErrorPageComponent,
  HomePageComponent,
  ListPageComponent,
  SettingsPageComponent,
  SignInPageComponent,
  SignUpPageComponent,
  VerifyEmailPageComponent,
} from '../pages';

const appRoutes: Routes = [
  {
    path: 'sign-in',
    component: SignInPageComponent,
    canActivate: [NotSignedInGuard],
  },
  {
    path: 'sign-up',
    component: SignUpPageComponent,
    canActivate: [NotSignedInGuard],
  },
  {
    path: 'verify-email',
    component: VerifyEmailPageComponent,
    canActivate: [SignedInAndEmailNotVerifiedGuard],
  },
  {
    path: 'list',
    component: ListPageComponent,
    canActivate: [SignedInAndEmailVerifiedGuardGuard],
  },
  {
    path: 'settings',
    component: SettingsPageComponent,
    canActivate: [SignedInGuard],
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
