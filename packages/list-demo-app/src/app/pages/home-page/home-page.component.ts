import { AuthService } from '../../services';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }

  goToLogin() {
    this.router.navigateByUrl('/login');
  }

  goToList() {
    this.router.navigateByUrl('/list');
  }

  isUserSignedIn() {
    return this.authService.isAuthenticated();
  }

}
