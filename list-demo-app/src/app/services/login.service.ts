import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService, GoogleLoginProvider } from 'angular-6-social-login';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient, private authService: AuthService, private router: Router) {
  }

  socialLogin(socialPlatform: string) {
    let socialPlatformProvider;

    if (socialPlatform === 'google') {
      socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;
    }

    this.authService.signIn(socialPlatformProvider).then(
      (userData) => {
        sessionStorage.setItem('idToken', userData.idToken);
        this.router.navigate(['/list']);
      }
    );
  }
}
