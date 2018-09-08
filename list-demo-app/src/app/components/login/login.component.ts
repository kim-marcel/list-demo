import { AuthService } from '../../services';
import { Component, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router, private zone: NgZone) {
  }

  ngOnInit() {
  }

  signInWithGoogle() {
    this.authService.signInWithGoogle().then(
      () => this.authService.getIdToken().then(
        (idToken) => {
          sessionStorage.setItem('idToken', idToken);
          sessionStorage.setItem('isLoggedIn', 'true');
          this.zone.run(() => this.router.navigate(['/list']));
        }
      )
    );
  }

}
