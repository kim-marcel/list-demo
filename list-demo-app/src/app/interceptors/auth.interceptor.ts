import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const idToken = sessionStorage.getItem('idToken');

    request = request.clone({
      setHeaders: {
        'Authorization': idToken === null ? 'null' : idToken,
      },
    });

    return next.handle(request);
  }
}

