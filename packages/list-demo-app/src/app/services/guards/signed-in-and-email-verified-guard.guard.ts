import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SignedInAndEmailVerifiedGuardGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {
  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.authService.getAuthState().pipe(map(
      (user) => {
        if (user && user.emailVerified) {
          return true;
        } else if (user && !user.emailVerified) {
          this.router.navigateByUrl('/verify-email');
          return false;
        }
        this.router.navigateByUrl('/sign-in');
        return false;
      }
    ));
  }
}
