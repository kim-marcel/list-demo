import { AuthService } from '../../services';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PasswordValidator, StringValidator } from '../../validators';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  changePasswordForm: FormGroup;

  constructor(private authService: AuthService, private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.changePasswordForm = this.formBuilder.group(
      {
        passwordCurrent: ['', [StringValidator.minLength(6), StringValidator.required]],
        password: ['', [StringValidator.minLength(6), StringValidator.required]],
        passwordConfirm: ['', [StringValidator.minLength(6), StringValidator.required]],
      }, {
        validator: PasswordValidator.matchPassword
      }
    );
  }

  changePassword() {
    this.authService.changePassword(
      this.changePasswordForm.value.passwordCurrent,
      this.changePasswordForm.value.password
    );
  }

}
