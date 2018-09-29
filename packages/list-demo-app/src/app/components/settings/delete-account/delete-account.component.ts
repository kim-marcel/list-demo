import { AuthService } from '../../../services';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { StringValidator } from '../../../validators';

@Component({
  selector: 'app-delete-account',
  templateUrl: './delete-account.component.html',
  styleUrls: ['./delete-account.component.css']
})
export class DeleteAccountComponent implements OnInit {

  deleteAccountForm: FormGroup;

  constructor(private authService: AuthService, private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.deleteAccountForm = this.formBuilder.group(
      {
        passwordCurrent: ['', [StringValidator.minLength(6), StringValidator.required]],
      }
    );
  }

  deleteAccount() {
    // TODO: delete user + all his info from the google datastore
    this.authService.deleteAccount(
      this.deleteAccountForm.value.passwordCurrent,
    );
  }

}
