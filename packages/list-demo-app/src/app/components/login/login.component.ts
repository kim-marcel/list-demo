import { AuthService } from '../../services';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email: string;
  password: string;

  constructor(private authService: AuthService) {
  }

  ngOnInit() {
  }

  socialSignIn(provider: string) {
    this.authService.socialSignIn(provider);
  }

  emailSignIn() {
    this.authService.emailSignIn(this.email, this.password);
  }

}
