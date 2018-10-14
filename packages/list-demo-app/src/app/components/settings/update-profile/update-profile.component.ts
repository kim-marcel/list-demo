import { AuthService, NotificationService, TextService } from '../../../services';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { StringValidator } from '../../../validators';

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.css']
})
export class UpdateProfileComponent implements OnInit {

  updateProfileForm: FormGroup;

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
    this.updateProfileForm = this.formBuilder.group(
      {
        name: ['', [StringValidator.isOnlyLetters, StringValidator.minLength(3), StringValidator.required]],
        surname: ['', [StringValidator.isOnlyLetters, StringValidator.minLength(3), StringValidator.required]],
        passwordCurrent: ['', [StringValidator.minLength(6), StringValidator.required]],
      }
    );
  }

  updateProfile() {
    this.authService.updateProfile(
      this.updateProfileForm.value.passwordCurrent,
      this.updateProfileForm.value.name,
      this.updateProfileForm.value.surname,
    ).then(() => {
      this.initializeForm();
      this.notificationService.success(this.textService.get('app.common.success.updateProfile'), 5000);
    });
  }

}
