import { AuthService } from '../../services';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PasswordValidator, StringValidator } from '../../validators';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  signUpForm: FormGroup;

  constructor(private authService: AuthService, private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.signUpForm = this.formBuilder.group({
        name: ['', [Validators.required, Validators.minLength(3), StringValidator.isOnlyLetters]],
        surname: ['', [Validators.required, Validators.minLength(3), StringValidator.isOnlyLetters]],
        email: ['', [Validators.required, StringValidator.isEmail]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        passwordConfirm: ['', [Validators.required, Validators.minLength(6)]],
      }, {
        validator: PasswordValidator.matchPassword
      }
    );
  }

  emailSignUp() {
    this.authService.emailSignUp(this.signUpForm.value);
  }

}
