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

  goToLogin() {
    this.router.navigateByUrl('login');
  }

  isUserLoggedIn() {
    return AuthService.isUserLoggedIn();
  }

  signOut() {
    this.authService.signOut()
      .then(() => {
          sessionStorage.removeItem('idToken');
          sessionStorage.setItem('isLoggedIn', 'false');
          this.router.navigate(['/home']);
        }
      );
  }

}
