import { BehaviorSubject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Message } from '../models';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private notification: BehaviorSubject<Message> = new BehaviorSubject(null);
  readonly $notification: Observable<Message> = this.notification.asObservable();

  constructor() {
  }

  error(message: string, timeout: number = null) {
    this.notification.next({severity: 'danger', messageBody: message});
    if (timeout) { this.resetAfterTimeout(timeout); }
  }

  success(message: string, timeout: number = null) {
    this.notification.next({severity: 'success', messageBody: message});
    if (timeout) { this.resetAfterTimeout(timeout); }
  }

  reset() {
    this.notification.next(null);
  }

  private resetAfterTimeout(timeout: number) {
    setTimeout(() => this.notification.next(null), timeout);
  }
}
