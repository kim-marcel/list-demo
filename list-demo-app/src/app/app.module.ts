import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { ListComponent } from './list/list.component';
import { ListResolver } from './services/resolver/list-resolver';
import { LoginService } from './services/login.service';
import { ListService } from './services/list.service';
import { MaterialModule } from './material.module';
import { LoginComponent } from './login/login.component';
import { LogoutService } from './services/logout.service';

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
  declarations: [
    AppComponent,
    ListComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    MaterialModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
    ListResolver,
    ListService,
    LoginService,
    LogoutService
  ],
  bootstrap: [
    AppComponent
  ]
})

export class AppModule {
}
