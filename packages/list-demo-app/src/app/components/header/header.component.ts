import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services';

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

  isLoggedIn() {
    return sessionStorage.getItem('isLoggedIn') === 'true';
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
