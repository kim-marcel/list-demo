import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireModule } from '@angular/fire';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AppErrorHandler } from './error-handler/app-error-handler';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { AuthService, ListResolver, ListService, TextService } from './services';
import { environment } from '../environments/environment';
import { ErrorPageComponent, HomePageComponent, ListPageComponent, SignInPageComponent, SignUpPageComponent } from './pages';
import { HeaderComponent, ListComponent, SignInComponent, SignUpComponent } from './components';
import { RoutingModule } from './modules/routing.module';
import { TextPipe } from './pipes/text.pipe';

@NgModule({
  declarations: [
    AppComponent,
    ErrorPageComponent,
    HeaderComponent,
    HomePageComponent,
    ListComponent,
    ListPageComponent,
    SignInComponent,
    SignInPageComponent,
    SignUpComponent,
    SignUpPageComponent,
    TextPipe,
  ],
  imports: [
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
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
