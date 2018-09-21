import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  email: string;
  password: string;
  passwordRepeated: string;

  constructor() {
  }

  ngOnInit() {
  }

  emailSignUp() {
    console.log('Register: ', this.email, this.password, this.passwordRepeated);
  }

  // TODO: refactor validation, make extra validation service, check email valid, password length,...
  inputIsValid() {
    return this.email === undefined ||
      this.password === undefined ||
      this.passwordRepeated === undefined ||
      this.password !== this.passwordRepeated;
  }

}
