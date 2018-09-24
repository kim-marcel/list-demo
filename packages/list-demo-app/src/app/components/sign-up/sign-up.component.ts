import { AuthService } from '../../services';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
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
        name: ['', [StringValidator.isOnlyLetters, StringValidator.minLength(3), StringValidator.required]],
        surname: ['', [StringValidator.isOnlyLetters, StringValidator.minLength(3), StringValidator.required]],
        email: ['', [StringValidator.isEmail, StringValidator.required]],
        password: ['', [StringValidator.minLength(6), StringValidator.required]],
        passwordConfirm: ['', [StringValidator.minLength(6), StringValidator.required]],
      }, {
        validator: PasswordValidator.matchPassword
      }
    );
  }

  emailSignUp() {
    if (!this.signUpForm.invalid) {
      this.authService.emailSignUp(this.signUpForm.value);
    }
  }

}
