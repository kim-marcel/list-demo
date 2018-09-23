import { AuthService } from '../../services';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  user = {
    name: '',
    surname: '',
    email: '',
    password: '',
    passwordRepeated: '',
  };

  constructor(private authService: AuthService) {
  }

  ngOnInit() {
  }

  emailSignUp() {
    this.authService.emailSignUp(this.user);
  }

  // TODO: refactor validation, make extra validation service, check email valid, password length,...
  inputIsValid() {
    return this.user.name === '' ||
      this.user.surname === '' ||
      this.user.email === '' ||
      this.user.password === '' ||
      this.user.passwordRepeated === '' ||
      this.user.password !== this.user.passwordRepeated;
  }

}
