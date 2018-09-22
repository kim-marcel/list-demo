import { AuthService } from '../services';
import { from, Observable } from 'rxjs';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { switchMap } from 'rxjs/operators';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor (private authService: AuthService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return from(this.authService.getIdToken()).pipe(switchMap(
      (idToken) => {
        request = request.clone({
          setHeaders: {
            'Authorization': 'Bearer ' + idToken,
          },
        });
        return next.handle(request);
      }
    ));
  }
}

