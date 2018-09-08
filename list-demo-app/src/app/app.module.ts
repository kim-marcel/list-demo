import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireModule } from 'angularfire2';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AppErrorHandler } from './error-handler/app-error-handler';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { AuthService } from './services';
import { environment } from '../environments/environment';
import { ErrorPageComponent } from './pages';
import { HeaderComponent } from './components';
import { HomePageComponent } from './pages';
import { ListComponent } from './components';
import { ListPageComponent } from './pages';
import { ListResolver } from './services';
import { ListService } from './services';
import { LoginComponent } from './components';
import { LoginPageComponent } from './pages';
import { LogoutComponent } from './components';
import { MaterialModule } from './modules/material/material.module';
import { RoutingModule } from './modules/routing/routing.module';

@NgModule({
  declarations: [
    AppComponent,
    ErrorPageComponent,
    HeaderComponent,
    HomePageComponent,
    ListComponent,
    ListPageComponent,
    LoginComponent,
    LoginPageComponent,
    LogoutComponent,
  ],
  imports: [
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    BrowserModule,
    HttpClientModule,
    MaterialModule,
    RoutingModule,
  ],
  providers: [
    {
      provide: ErrorHandler,
      useClass: AppErrorHandler,
    },
    {
      provide : HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi   : true,
    },
    AuthService,
    ListResolver,
    ListService,
  ],
  bootstrap: [
    AppComponent
  ]
})

export class AppModule {
}
