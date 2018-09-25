import { AuthService } from '../../services';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }

  goToSignIn() {
    this.router.navigateByUrl('/sign-in');
  }

  goToSettings() {
    this.router.navigateByUrl('/settings');
  }

  isUserSignedIn() {
    return this.authService.isAuthenticated();
  }

  signOut() {
    this.authService.signOut();
  }

}
