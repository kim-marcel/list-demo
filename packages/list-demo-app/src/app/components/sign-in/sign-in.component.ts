import { AuthService } from '../../services';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
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
      email: ['', [StringValidator.isEmail, StringValidator.required]],
      password: ['', [StringValidator.minLength(6), StringValidator.required]],
    });
  }

  emailSignIn() {
    if (!this.signInForm.invalid) {
      this.authService.emailSignIn(this.signInForm.value.email, this.signInForm.value.password);
    }
  }

  socialSignIn(provider: string) {
    this.authService.socialSignIn(provider);
  }

}
