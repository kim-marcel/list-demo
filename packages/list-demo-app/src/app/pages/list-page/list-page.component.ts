import { Component, NgZone, OnDestroy, OnInit } from '@angular/core';
import { Message } from '../../models';
import { NotificationService } from '../../services';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-list-page',
  templateUrl: './list-page.component.html',
  styleUrls: ['./list-page.component.css']
})
export class ListPageComponent implements OnInit, OnDestroy {

  notification: Message;
  notificationSubscription: Subscription;

  constructor(private notificationService: NotificationService, private zone: NgZone) { }

  ngOnInit() {
    this.notificationSubscription = this.notificationService.$notification.subscribe(
      (data) => this.zone.run(() => this.notification = data));
  }

  ngOnDestroy() {
    this.notificationService.reset();
    this.notificationSubscription.unsubscribe();
  }

}
