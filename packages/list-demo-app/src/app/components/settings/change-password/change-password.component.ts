import { AuthService, NotificationService, TextService } from '../../../services';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PasswordValidator, StringValidator } from '../../../validators';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  changePasswordForm: FormGroup;

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private notificationService: NotificationService,
    private textService: TextService) {
  }

  ngOnInit() {
    this.initializeForm();
  }

  initializeForm() {
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
      this.changePasswordForm.value.password,
    ).then(() =>  {
      this.initializeForm();
      this.notificationService.success(this.textService.get('app.common.success.changedPassword'), 5000);
    });
  }

}
