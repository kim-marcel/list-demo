import { AbstractControl } from '@angular/forms';
import { Errors } from './errors';

export class PasswordValidator {

  static matchPassword(abstractControl: AbstractControl) {
    const password = abstractControl.get('password').value;
    const passwordConfirm = abstractControl.get('passwordConfirm').value;
    return passwordConfirm !== password ? {error: Errors.PASSWORDS_DONT_MATCH} : null;
  }

}
