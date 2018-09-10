import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireModule } from 'angularfire2';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AppErrorHandler } from './error-handler/app-error-handler';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { AuthService, ListResolver, ListService, TextService } from './services';
import { environment } from '../environments/environment';
import { ErrorPageComponent, HomePageComponent, ListPageComponent, LoginPageComponent } from './pages';
import { HeaderComponent, ListComponent, LoginComponent, LogoutComponent } from './components';
import { PrimeNGModule, RoutingModule } from './modules';
import { TextPipe } from './pipes/text.pipe';

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
    TextPipe,
  ],
  imports: [
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    BrowserModule,
    HttpClientModule,
    PrimeNGModule,
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
    TextService,
  ],
  bootstrap: [
    AppComponent
  ]
})

export class AppModule {
}
