import { Component } from '@angular/core';
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  private loading = false;

  constructor(private router: Router) {
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
  }

  isLoading(): boolean {
    return this.loading;
  }

}
