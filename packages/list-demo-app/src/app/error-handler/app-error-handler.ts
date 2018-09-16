import { ErrorHandler, Injectable, Injector, NgZone } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable()
export class AppErrorHandler implements ErrorHandler {

  constructor(private injector: Injector, private zone: NgZone) {
  }

  handleError(error: Error | HttpErrorResponse): void {
    if (error instanceof HttpErrorResponse) {
      this.handleHttpError(error);
    } else {
      console.error(error);
    }
  }

  handleHttpError(error: HttpErrorResponse): void {
    console.error(`${error.statusText}: ${error.status}`);
    console.error(`Backend returned code ${error.status}, ` + `body was: ${error.error}`);
    if (error.status === 401) {
      sessionStorage.removeItem('idToken');
      const router = this.injector.get(Router);
      this.zone.run(() => router.navigateByUrl('/login'));
    }
  }

}
