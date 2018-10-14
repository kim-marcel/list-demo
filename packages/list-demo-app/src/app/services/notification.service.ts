import { BehaviorSubject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Message } from '../models';
import { publish, refCount } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private notification: BehaviorSubject<Message> = new BehaviorSubject(null);
  readonly $notification: Observable<Message> = this.notification.asObservable().pipe(
    publish(),
    refCount()
  );

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

  private resetAfterTimeout(timeout: number) {
    setTimeout(() => this.notification.next(null), timeout);
  }
}
