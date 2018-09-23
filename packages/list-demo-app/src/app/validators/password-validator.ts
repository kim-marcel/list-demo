import { AbstractControl } from '@angular/forms';

export class PasswordValidator {

  static matchPassword(abstractControl: AbstractControl) {
    const password = abstractControl.get('password').value;
    const passwordConfirm = abstractControl.get('passwordConfirm').value;

    return passwordConfirm !== password ? {matchPassword: true} : null;
  }

}
