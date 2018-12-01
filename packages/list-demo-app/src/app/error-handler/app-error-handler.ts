import { AuthErrorCode } from '../enums';
import { ErrorHandler, Injectable, Injector, NgZone } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { NotificationService, TextService } from '../services';
import { Router } from '@angular/router';

@Injectable()
export class AppErrorHandler implements ErrorHandler {

  constructor(
    private injector: Injector,
    private notificationService: NotificationService,
    private textService: TextService,
    private zone: NgZone) {
  }

  static isFirebaseAuthError(error: any): boolean {
    return error.code ? error.code.startsWith('auth/') : false;
  }

  handleError(error: Error | HttpErrorResponse): void {
    if (error instanceof HttpErrorResponse) {
      this.handleHttpError(error);
    } else if (AppErrorHandler.isFirebaseAuthError(error)) {
      this.handleFirebaseAuthError(error);
    } else {
      console.error(error);
      this.notificationService.error(`${error.name}: ${error.message}`);
    }
  }

  handleHttpError(error: HttpErrorResponse): void {
    console.error(`${error.statusText}: ${error.status}`);
    console.error(`Backend returned code ${error.status}, ` + `body was: ${error.error}`);
    if (error.status === 401) {
      // TODO: check if user is logged in, if he is don't redirect to sig-in
      const router = this.injector.get(Router);
      this.zone.run(() => router.navigateByUrl('/sign-in'));
    } else {
      this.notificationService.error(this.textService.get('app.common.error.http.default'));
    }
  }

  handleFirebaseAuthError(error: any): void {
    switch (error.code) {
      case AuthErrorCode.ACCOUNT_EXISTS_WITH_DIFFERENT_CREDENTIAL:
        this.notificationService.error(this.textService.get('app.common.error.auth.accountExistsWithDifferentCredential'));
        break;
      case AuthErrorCode.EMAIL_ALREADY_IN_USE:
        this.notificationService.error(this.textService.get('app.common.error.auth.emailAlreadyInUse'));
        break;
      case AuthErrorCode.INVALID_EMAIL:
        this.notificationService.error(this.textService.get('app.common.error.auth.invaidEmail'));
        break;
      case AuthErrorCode.POPUP_BLOCKED:
        this.notificationService.error(this.textService.get('app.common.error.auth.popupBlocked'));
        break;
      case AuthErrorCode.POPUP_CLOSED_BY_USER:
        this.notificationService.error(this.textService.get('app.common.error.auth.popupClosedByUser'));
        break;
      case AuthErrorCode.USER_DISABLED:
        this.notificationService.error(this.textService.get('app.common.error.auth.userDisabled'));
        break;
      case AuthErrorCode.USER_NOT_FOUND:
        this.notificationService.error(this.textService.get('app.common.error.auth.userNotFound'));
        break;
      case AuthErrorCode.USER_TOKEN_EXPIRED:
        this.notificationService.error(this.textService.get('app.common.error.auth.userTokenExpired'));
        break;
      case AuthErrorCode.WEAK_PASSWORD:
        this.notificationService.error(this.textService.get('app.common.error.auth.weakPassword'));
        break;
      case AuthErrorCode.WRONG_PASSWORD:
        this.notificationService.error(this.textService.get('app.common.error.auth.wrongPasword'));
        break;
      default:
        this.notificationService.error(error.message);
    }
  }
}
