import { ErrorHandler, Injectable, Injector, NgZone } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { NotificationService } from '../services';
import { Router } from '@angular/router';

@Injectable()
export class AppErrorHandler implements ErrorHandler {

  constructor(private injector: Injector, private notificationService: NotificationService, private zone: NgZone) {}

  handleError(error: Error | HttpErrorResponse): void {
    this.notificationService.error(error.toString());
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
      const router = this.injector.get(Router);
      this.zone.run(() => router.navigateByUrl('/sign-in'));
    }
  }

}
