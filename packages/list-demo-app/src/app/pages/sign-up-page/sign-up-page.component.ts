import { Component, NgZone, OnDestroy, OnInit } from '@angular/core';
import { Message } from '../../models';
import { NotificationService } from '../../services';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-sign-up-page',
  templateUrl: './sign-up-page.component.html',
  styleUrls: ['./sign-up-page.component.css']
})
export class SignUpPageComponent implements OnInit, OnDestroy {

  notification: Message;
  notificationSubscription: Subscription;

  constructor(private notificationService: NotificationService, private zone: NgZone) {
  }

  ngOnInit() {
    this.notificationSubscription = this.notificationService.$notification.subscribe(
      (data) => this.zone.run(() => this.notification = data));
  }

  ngOnDestroy() {
    this.notificationService.reset();
    this.notificationSubscription.unsubscribe();
  }
}
