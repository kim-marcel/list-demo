import { Component, NgZone } from '@angular/core';
import { Message } from './models';
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router } from '@angular/router';
import { NotificationService } from './services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  private loading = false;
  notification: Message;

  constructor(private notificationService: NotificationService, private router: Router, private zone: NgZone) {
    this.router.events.subscribe((event) => {

      switch (event.constructor) {
        case NavigationStart: {
          this.loading = true;
          break;
        }
        case NavigationEnd:
        case NavigationCancel:
        case NavigationError: {
          this.loading = false;
          break;
        }
        default: {
          break;
        }
      }

    });

    notificationService.$notification.subscribe(
      (data) => this.zone.run(() => this.notification = data));
  }

  isLoading(): boolean {
    return this.loading;
  }

}
