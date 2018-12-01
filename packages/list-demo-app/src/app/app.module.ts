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
import {
  ErrorPageComponent,
  HomePageComponent,
  ListPageComponent,
  SettingsPageComponent,
  SignInPageComponent,
  SignUpPageComponent,
  VerifyEmailPageComponent,
} from './pages';
import {
  ChangePasswordComponent,
  DeleteAccountComponent,
  HeaderComponent,
  ListComponent,
  SettingsComponent,
  SignInComponent,
  SignUpComponent,
  UpdateProfileComponent,
} from './components';
import { RoutingModule } from './modules/routing.module';
import { TextPipe } from './pipes/text.pipe';

@NgModule({
  declarations: [
    AppComponent,
    ChangePasswordComponent,
    DeleteAccountComponent,
    ErrorPageComponent,
    HeaderComponent,
    HomePageComponent,
    ListComponent,
    ListPageComponent,
    SettingsComponent,
    SettingsPageComponent,
    SignInComponent,
    SignInPageComponent,
    SignUpComponent,
    SignUpPageComponent,
    TextPipe,
    UpdateProfileComponent,
    VerifyEmailPageComponent,
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
