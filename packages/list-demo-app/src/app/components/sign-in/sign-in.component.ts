import { AuthService } from '../../services';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StringValidator } from '../../validators';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  signInForm: FormGroup;

  constructor(private authService: AuthService, private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.signInForm = this.formBuilder.group({
      email: ['', [Validators.required, StringValidator.isEmail]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  emailSignIn() {
    this.authService.emailSignIn(this.signInForm.value.email, this.signInForm.value.password);
  }

  socialSignIn(provider: string) {
    this.authService.socialSignIn(provider);
  }

}
