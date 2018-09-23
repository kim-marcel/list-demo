import { AuthService } from './auth.service';
import { CanActivate, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor (private authService: AuthService, private router: Router) {}

  canActivate(): boolean | Observable<boolean> {
    return this.authService.getAuthState().pipe(map(
      (user) => {
        if (user) {
          return true;
        } else {
          this.router.navigateByUrl('/sign-in');
          return false;
        }
      }
    ));
  }

}
