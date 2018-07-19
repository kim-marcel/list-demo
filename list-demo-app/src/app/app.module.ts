import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { ListComponent } from './list/list.component';
import { ListResolver } from './services/resolver/list-resolver';
import { LoginService } from './services/login.service';
import { ListService } from './services/list.service';
import { MaterialModule } from './material/material.module';
import { LoginComponent } from './login/login.component';
import { LogoutService } from './services/logout.service';
import { RoutingModule } from './routing/routing.module';

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
    RoutingModule
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
