import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { ListComponent } from './list/list.component';
import { ListResolver } from './services/resolver/list-resolver';
import { LoginService } from './services/login.service';
import { ListService } from './services/list.service';
import { MaterialModule } from './material/material.module';
import { LoginComponent } from './login/login.component';
import { LogoutService } from './services/logout.service';
import { RoutingModule } from './routing/routing.module';
import { AuthServiceConfig, GoogleLoginProvider, SocialLoginModule } from 'angular-6-social-login';
import { AuthInterceptor } from './interceptors/auth.interceptor';

// Configs
export function getAuthServiceConfigs() {
  const config = new AuthServiceConfig(
    [
      {
        id: GoogleLoginProvider.PROVIDER_ID,
        provider: new GoogleLoginProvider('INSERT_CLIENT_ID_HERE')
      }
    ]
  );
  return config;
}

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
    RoutingModule,
    SocialLoginModule
  ],
  providers: [
    {
      provide : HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi   : true,
    },
    ListResolver,
    ListService,
    LoginService,
    LogoutService,
    {
      provide: AuthServiceConfig,
      useFactory: getAuthServiceConfigs
    }
  ],
  bootstrap: [
    AppComponent
  ]
})

export class AppModule {
}
