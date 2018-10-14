import { Component, NgZone, OnDestroy, OnInit } from '@angular/core';
import { Message } from '../../models';
import { NotificationService } from '../../services';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-sign-in-page',
  templateUrl: './sign-in-page.component.html',
  styleUrls: ['./sign-in-page.component.css']
})
export class SignInPageComponent implements OnInit, OnDestroy {

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
