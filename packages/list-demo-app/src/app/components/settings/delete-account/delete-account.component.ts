import { AuthService } from '../../../services';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { StringValidator } from '../../../validators';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-delete-account',
  templateUrl: './delete-account.component.html',
  styleUrls: ['./delete-account.component.css']
})
export class DeleteAccountComponent implements OnInit {

  @Input() userIsLoggedInWithEmail: boolean;

  deleteAccountForm: FormGroup;

  constructor(private authService: AuthService, private formBuilder: FormBuilder, private userService: UserService) {
  }

  ngOnInit() {
    this.initializeForm();
  }

  initializeForm() {
    this.deleteAccountForm = this.formBuilder.group(
      {
        passwordCurrent: ['', [StringValidator.minLength(6), StringValidator.required]],
      }
    );
  }

  deleteAccount() {
    let password = this.deleteAccountForm.value.passwordCurrent;
    if (!this.userIsLoggedInWithEmail) {
      password = null;
    }

    this.authService.reauthenticate(password).then(
      () => this.userService.deleteUserData().subscribe(
        () => this.authService.deleteUserAccount()
      )
    );
  }

}
