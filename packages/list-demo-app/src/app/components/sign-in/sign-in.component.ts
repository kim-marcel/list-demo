import { AuthService } from '../../services';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

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
