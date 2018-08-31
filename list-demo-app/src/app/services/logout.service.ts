import { AuthService } from 'angular-6-social-login';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LogoutService {

  constructor(private http: HttpClient, private authService: AuthService, private router: Router) {
  }

  socialLogout() {
    this.authService.signOut();
    sessionStorage.removeItem('idToken');
    this.router.navigate(['/login']);
  }

}
